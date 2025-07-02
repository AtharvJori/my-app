const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    // Reference to the user who favorited the movie
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  
    // Movie details
    movieId: {
        type: String,
        required: true,
        index: true
    },
  
    title: {
        type: String,
        required: true
    },
  
    releaseDate: {
        type: Date,
        required: true
    },
  
    description: {
        type: String,
        required: true
    },
  
    // Image URLs
    image: {
        poster: String,
        backdrop: String,
        logo: String
    }
});

const userSchema = new mongoose.Schema({
    // Clerk authentication ID
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
  
    // Personal information
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    profilePicture: {
        type: String,
        default: ''
    },
    favs: {
        type=[favoriteSchema],
        default: []
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;