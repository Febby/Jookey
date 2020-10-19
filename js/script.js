const audioElement = document.getElementById('jookey-voice');
const button = document.getElementById('button');


//Disable/enable button

function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing Joje to voiceRSS

function tellMe(joke) {
    // console.log('tell me:', joke);
    const jokeText = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: 'e100ba03724d49cda71000fc7ddaf092',
        src: jokeText,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data.joke);
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        // Catch errors
        console.log('Whoops', error)
    }
    
}

// Event listener

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);