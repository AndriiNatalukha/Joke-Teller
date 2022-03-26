const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'f80479ff79114945bc33a428c1c28546',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

// Get Jokes From Joke API
async function getJokes() {
    let joke = '';
    try {
        const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delyvery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();

    } catch (error) {

    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);