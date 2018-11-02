import React, { Component } from "react";
import { connect } from "react-redux";

import schemas from "src/schemas";
import { db } from "src/firebase";

import TableList from "src/components/TableList/TableList";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class CollectionPage extends Component {
  constructor(props) {
    super(props);

    this.references = {};
    this.state = {
      data: [],
      collection: this.props.match.params.collection
    };
  }
  componentDidMount() {
    const { collection } = this.props.match.params;

    db.get(`/${collection}`).then(res => {
      this._washDataForDisplay(res.val()).then(data => {
        this.setState({ data });
      });
    });
  }

  _washDataForDisplay(data) {
    return new Promise((resolve, reject) => {
      const { collection } = this.props.match.params;
      const current = schemas[collection];
      this.references = {};
      const referenceKeys = current.ui.filter(
        uiKey =>
          current.fields.filter(field => field.name === uiKey)[0].type ===
          "reference"
      );

      if (referenceKeys.length > 0) {
        Promise.all(referenceKeys.map(key => db.get(`/${key}`))).then(
          allReferences => {
            allReferences.map((res, index) => {
              this.references[referenceKeys[index]] = res.val();
            });

            const cleanedUpData = Object.keys(data).map(key => {
              const item = data[key];
              let dataToReturn = {
                key,
                ...item
              };
              Object.keys(dataToReturn).map(key => {
                // replace reference
                if (this.references[key]) {
                  // map through reference ids and replace them with reference name.
                  dataToReturn[key] = dataToReturn[key].map(
                    id => this.references[key][id].name
                  );
                }
              });

              return dataToReturn;
            });
            resolve(cleanedUpData);
          }
        );
      } else {
        const cleanedUpData = Object.keys(data).map(key => {
          const item = data[key];
          return {
            key,
            ...item
          };
        });
        resolve(cleanedUpData);
      }
    });
  }

  componentDidUpdate(prevProps) {
    /**
     * this is the initial render
     * without a previous prop change
     */
    if (prevProps == undefined) {
      return false;
    }

    /**
     * new collection in town ?
     */
    if (this.state.collection != this.props.match.params.collection) {
      db.get(`/${this.props.match.params.collection}`).then(res => {
        this._washDataForDisplay(res.val()).then(data => {
          this.setState({
            data,
            collection: this.props.match.params.collection
          });
        });
      });
    }
  }

  render() {
    const { collection } = this.props.match.params;
    const current = schemas[collection];
    return (
      <div className="home-page">
        <h1>{capitalizeFirstLetter(collection)}</h1>
        <TableList
          ui={current.ui}
          collection={collection}
          data={this.state.data}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(CollectionPage);
