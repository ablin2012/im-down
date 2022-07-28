const mongoose = require('mongoose');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Message = require('./models/Message')
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  const seedUsers = [
    {
        email: "demo@gmail.com",
        handle: "demo",
        password: "123456",
        password2: "123456"
    },
    {
        email: "addrio@gmail.com",
        handle: "Alexandra Daddario",
        password: "123456",
        password2: "123456"
    },
    {
        email: "zendaya@gmail.com",
        handle: "Zendaya Coleman",
        password: "123456",
        password2: "123456"
    },
    {
        email: "bellaP@gmail.com",
        handle: "Bella Poarch",
        password: "123456",
        password2: "123456"
    },
    {
        email: "emma@gmail.com",
        handle: "Emma Stone",
        password: "123456",
        password2: "123456"
    },
    {
        email: "dojacat@gmail.com",
        handle: "Doja Cat",
        password: "123456",
        password2: "123456"
    }
  ];
  const seedUserProfiles = [
      { user_id: '62e037b54780df32d1a7991e',
        name:'Anthonie Lorsithong',
        description:"Life is Great, But Maybe It Can Be Better With You? ",
        interests:["ping pong","watch one piece","tennis","programming"],
        age:21,
        gender:"male",
        personality:["thinker","playboy","deez-nuts"],
        loveLanguage:"touch",
        imageUrl:'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel:100,
        location:"Los Angeles",
        commitmentLevel:100,
        pronouns:"he/him",
       },
       { user_id: '62e037d34780df32d1a79921',
        name:'Alexandra Daddario',
        description:'American actress. She had her breakthrough portraying Annabeth Chase in the Percy Jackson film series (2010–2013). She has since starred as Paige in Hall Pass (2011), Heather Miller in Texas Chainsaw 3D (2013), Blake Gaines in San Andreas (2015), Summer Quinn in Baywatch (2017), and Alexis Butler in We Summon the Darkness (2019). She has also guest starred in television series such as White Collar, It is Always Sunny in Philadelphia, True Detective, New Girl, and American Horror Story: Hotel. In 2021, she starred in the first season of the HBO series The White Lotus, for which she received widespread critical acclaim and an Emmy nomination for Outstanding Supporting Actress in a Limited or Anthology Series or Movie in 2022.',
        interests:["cars","sushi","ice cream","dogs"],
        age:36,
        gender:"female",
        personality:["thinker","dogs","music"],
        loveLanguage:"talk",
        imageUrl:'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel:100,
        location:"Los Angeles",
        commitmentLevel:100,
        pronouns:"she/her",
       },
       {
        user_id: '62e037e94780df32d1a79924',
        name:'Zendaya Maree Stoermer Coleman',
        description:"I am out of your league ",
        interests:["acting","dancing","dating tom holland"],
        age:25,
        gender:"female",
        personality:["outgoing","intuitive","determine"],
        loveLanguage: "words of affirmation",
        imageUrl:'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel:80,
        location:"Los Angeles",
        commitmentLevel:85,
        pronouns:"she/her",
       },
       { user_id: '62e037fd4780df32d1a79927',
        name:'Bella Poarch',
        description:"Want some cake?",
        interests:["filming tiktok","traveling","petting dog"],
        age:25,
        gender:"female",
        personality:["Introvert","Sensing","Feeling",],
        loveLanguage:"touch",
        imageUrl:'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel:70,
        location:"Los Angeles",
        commitmentLevel:50,
        pronouns:"she/her",
       },
       { user_id: '62e038894780df32d1a7992d',
        name:'"Emma" Jean Stone',
        description: "I do find that I'm drawn to people in my life, romantically or not, that have something to teach me.",
        interests: ["acting","wine tasting","swimming","supporting charities"],
        age: 33,
        gender: "female",
        personality: ["fun","active","sensitive"],
        loveLanguage: "quality time",
        imageUrl: 'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel: 100,
        location: "Los Angeles",
        commitmentLevel: 100,
        pronouns: "she/her",
       },
       { user_id: '62e038204780df32d1a7992a',
        name:'Doja Cat',
        description:"I know you ain't a drug but you get me so high",
        interests:["rapping","singing","listening to songs"],
        age:26,
        gender:"female",
        personality:["spontaneous","extraversion","perceiving"],
        loveLanguage:"touch",
        imageUrl:'https://lacks-aa-dev.s3.us-west-1.amazonaws.com/profile+picture.png',
        happinessLevel:99,
        location:"Los Angeles",
        commitmentLevel:30,
        pronouns:"she/her",
       }
  ];
  const seedMessages = [
    {
      message: "How you doing?",
      sender: "62e037b54780df32d1a7991e",
      recipient: "62e037d34780df32d1a79921"
    },
    {
      message: "You know how there's an I in Beautiful? So why aren't I in you, Beautiful?",
      sender: "62e037b54780df32d1a7991e",
      recipient: "62e037e94780df32d1a79924"
    },
    {
      message: "So uhhh... You look good in your picture",
      sender: "62e037fd4780df32d1a79927",
      recipient: "62e037b54780df32d1a7991e"
    },
    {
      message: "I am not interested. Sorry.",
      sender: "62e038894780df32d1a7992d",
      recipient: "62e037b54780df32d1a7991e"
    },
    {
      message: "Know any good restuarants around here?",
      sender: "62e037b54780df32d1a7991e",
      recipient: "62e038204780df32d1a7992a"
    }
  ]
  const seedDB = async () => {
    // await Message.deleteMany({});
    // await Message.insertMany(seedMessages)
    await User.findOneAndUpdate({email: "addrio@gmail.com"}, {matches: [seedUserProfiles[0], seedUserProfiles[2], seedUserProfiles[3], seedUserProfiles[4], seedUserProfiles[5]]})
    await User.findOneAndUpdate({email: "zendaya@gmail.com"}, {matches: [seedUserProfiles[0], seedUserProfiles[1], seedUserProfiles[3], seedUserProfiles[4], seedUserProfiles[5]]})
    await User.findOneAndUpdate({email: "demo@gmail.com"}, {matches: [seedUserProfiles[1], seedUserProfiles[2], seedUserProfiles[3], seedUserProfiles[4], seedUserProfiles[5]]})
    await User.findOneAndUpdate({email: "emma@gmail.com"}, {matches: [seedUserProfiles[0], seedUserProfiles[1], seedUserProfiles[2], seedUserProfiles[3], seedUserProfiles[5]]})
    await User.findOneAndUpdate({email: "dojacat@gmail.com"}, {matches: [seedUserProfiles[0], seedUserProfiles[1], seedUserProfiles[2], seedUserProfiles[3], seedUserProfiles[4]]})
    await User.findOneAndUpdate({email: "bellaP@gmail.com"}, {matches: [seedUserProfiles[0], seedUserProfiles[1], seedUserProfiles[2], seedUserProfiles[4], seedUserProfiles[5]]})
    // await UserProfile.deleteMany({});
    // await UserProfile.insertMany(seedUserProfiles);
  }
  seedDB().then(()=>{
    mongoose.connection.close();
  });