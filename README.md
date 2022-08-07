# ImDown README
![imdown logo](./assets/imdown.png)

[ImDown](https://welpadam.herokuapp.com/#/) is a motivational social media application built using a MERN stack and AWS hosting. The app is designed to bring people with common interests together. Users can create, join, and track challenges shared to the community, post progress updates, and collect achievements.

# Technologies

* Backend: MongoDB, ExpressJS, NodeJS
* Frontend: React, Redux
* Image Hosting: Active Storage and AWS S3

# Features

### User Auth
* Visitors can sign up to be a user or login as a demo user
* Certain pages can only be accessed when logged in, or when logged out
* Login errors will display and won't persist

### Create, Read, Update, and Delete Challenges
* Logged in users can create challenges with personal images
* Images attached by a user are saved to the database and stored in an AWS S3 bucket
* All challenges are displayed on the challenge index page, sorted by category
* Challenges created by the logged in user display update and delete options on the challenge show page

### Search and Filters
* Users can search for challenges based on title or category
* Typing into the search bar on the challenge index page will automatically update the challenges displayed to match the inputted text
```
// challengeIndex.js
handleCallback = (navSearchData) => this.setState({'filter': navSearchData})

handleSearch() {
    if(this.state.filter === "") {
        return this.state.challenges
    } else {
        return this.state.challenges.filter(challenge => 
            challenge.title.match(new RegExp(this.state.filter, "i")) || 
            challenge.description.match(new RegExp(this.state.filter, "i")) ||
            challenge.category.match(new RegExp(this.state.filter, "i")))
    }
}

// navBar.js
updateSearch() {
    return e => {
        this.props.parentCallback(e.currentTarget.value)
    }
}
```

### Home Page
* Logged in users can view posts created by friends, themselves, and users in challenges they are participating in
* Page includes statistics about the logged in user and quick link to the show pages of participated challenges
