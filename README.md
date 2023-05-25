# Cloned Cloud

Cloned Cloud is an application for people who are interested in music. It is a website where users can view and comment on songs, and upload their own. They can interact with each other in the comments section and share their thoughts on each song.

## Screenshots
#### Browse Songs
![Browse]
#### Song Details
![Details]

[Browse]: Browse.png
[Details]: Details.png
## Features
* Songs
  - Read Songs
  - Create Songs
  - Update Songs
  - Delete Songs

* Comments
  - Read Comments
  - Create Comments
  - Delete Comments

## Setting up the application
After you have cloned the repo, navigate into the backend directory.
- Create a file called .env and copy the .env.example contents to this file (`cp .env.example .env`).
- Open a terminal for the backend folder and run `npm install`.
- To migrate and seed the database, run `npm run build`. If at any point you want to reset the database, hit `ctrl C` and then `npm run rebuild`.
- Open a terminal for the frontend folder and run `npm install`.
- To start the servers, type `npm start` in each of the frontend and backend terminals.

## Technologies used:

- Node.js
- Express
- Sequelize
- Sqlite3
- React
- Redux
- Html5
- Css
- Git
- Javascript

## Technical Notes
In the form for creating a song, I created a default image for the song so that choosing your own image is optional. First, I created a state variable for the image URL.
```javascript
 const [imageUrl, setImageUrl] = useState('https://png.pngtree.com/png-clipart/20221006/original/pngtree-music-notes-png-image_8660757.png');
 ```
Then, in the form, I set the value of the image URL input field as that state variable, the default image. If the user wants to replace it with a custom URL, they can enter it into the input field and it will update.
```javascript
<div className="input-container">
  <label htmlFor="imageUrl" className="input-label">
    Image URL (optional)
  </label>
  <input
    type="text"
    id="imageUrl"
    className="add-song-input"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="Enter an image URL"
  />
</div>
```
