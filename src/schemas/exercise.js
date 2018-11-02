export default {
  name: "Exercise",
  slug: "exercise",
  ui: ["name", "bodypart", "category"],
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true
    },
    {
      label: "Bodyparts",
      name: "bodypart",
      type: "reference",
      referenceModel: "bodypart",
      referenceSearchLabel: "name",
      required: true
    },
    // {
    //   label: "Bodyparts",
    //   name: "bodyparts",
    //   type: "tags",
    //   required: true
    // },
    {
      label: "Category",
      name: "category",
      type: "select",
      values: [
        "Barbell",
        "Dumbbell",
        "Machine / Other",
        "Weighted Bodyweight",
        "Assisted Bodyweight",
        "Reps Only",
        "Cardio"
      ],
      required: true
    }
  ]
};
