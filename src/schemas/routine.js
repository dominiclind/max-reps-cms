export default {
  name: "Routine",
  slug: "routine",
  ui: ["name", "category"],
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true
    },
    {
      label: "Exercises",
      name: "exercises",
      type: "reference",
      referenceModel: "exercise",
      referenceSearchLabel: "name",
      required: true
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      values: ["Push/Pull/Legs"],
      required: true
    }
  ]
};
