const mongoose = require('mongoose');

// Declare the Schema of the Blog model
const blogSchema = new mongoose.Schema(
  {
    // Field for blog title
    title: {
      type: String,
      required: true,
    },
    discription :{
      type :String,
      required :true,
    },
    // Field for blog content
    category: {
      type: String,
      required: true,
    },
    // Field for the number of views
    numViews: {
      type: Number,
      default: 0,
    },
    // Fields for user interactions
      isLiked: {
        type: Boolean,
        default: false,
      },
      isDisliked: {
        type: Boolean,
        default: false,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
      dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
    // Field for blog image URL
    images: [],

    // Field for blog author
    author: {
      type: String,
      default: "admin",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('Blog', blogSchema);
