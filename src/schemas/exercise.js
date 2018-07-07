export default {
  name: "Exercise",
  slug: "exercise",
  ui: ["name", "reps", "bodyparts"],
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true
    },
    {
      label: "Reps",
      name: "reps",
      type: "reps",
      required: true
    },
    // {
    //   label: "Allowed users",
    //   name: "allowed-users",
    //   type: "reference",
    //   referenceModel: "user",
    //   referenceSearchLabel: "username",
    //   required: true
    // },
    {
      label: "Bodyparts",
      name: "bodyparts",
      type: "tags",
      required: true
    }
  ]
};
