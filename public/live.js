// This will use the demo backend if you open index.html locally via file://, otherwise your server will be used
let backendUrl = location.protocol === 'file:' ? "https://tiktok-chat-reader.zerody.one/" : undefined;
let connection = new TikTokIOConnection(backendUrl);

// Counter
let viewerCount = 0;
let likeCount = 0;
let diamondsCount = 0;

// These settings are defined by obs.html
if (!window.settings) window.settings = {};

var models = [
    {
        'title' : 'Asmara',
        'description' : 'Jauhi kebiasaan yang tak disukainya meskipun dirinya saat ini selalu diam dan tidak mempermasalahkan nya'
    },
    {
        'title' : 'Asmara',
        'description' : 'Bicaralah apa adanya tanpa ada yang ditutup-tutupi darinya meskipun Anda merasa kejujuran tersebut akan membuatnya kecewa'
    },
    {
        'title' : 'Asmara',
        'description' : 'jangan terus menuruti panasnya hati agar suasana bisa segera mencair dan tidak akan semakin membara saja'
    },
    {
        'title' : 'Asmara',
        'description' : 'Memang begitu wataknya yang selalu angin-anginan, bersabar sajalah tanpa harus membuatnya emosi'
    },
    {
        'title' : 'Asmara',
        'description' : 'Memang tak mudah untuk dapat bersikap tenang melihat sikapnya yang keras kepala dan terkesan seenaknya sendiri'
    },
    {
        'title' : 'Asmara',
        'description' : 'Selama hati terus diliputi perasaan emosi yang meletup-letup maka hubungan percintaan ini akan tidak ada tenang'
    },
    {
        'title' : 'Asmara',
        'description' : 'Suasana di hari ini tetaplah ceria dan hampir tidak ada gangguan yang harus dikhawatirkan'
    },
    {
        'title' : 'Asmara',
        'description' : 'Berhati-hatilah dengan hadirnya pihak ketiga yang mempunyai niat buruk untuk merusak hubungan Anda dengannya'
    },
    {
        'title' : 'Asmara',
        'description' : 'Kesempatan untuk memperkuat ikatan emosional dengan pasangan atau membangun hubungan yang lebih stabil'
    },
    {
        'title' : 'Asmara',
        'description' : 'Komunikasi akan menjadi kunci dalam hubungan, terbuka dan jujur dalam berkomunikasi akan mengatasi hambatan dan konflik dengan mudah.'
    },
    {
        'title' : 'Asmara',
        'description' : 'Merenung dan memahami perasaan dengan pasangan akan menciptakan kedalaman emosi dalam hubungan.'
    },
    {
        'title' : 'Asmara',
        'description' : 'perhatian dan dukungan yang cukup kepada pasangan akan membantu mempertahankan keseimbangan.'
    },
    {
        'title' : 'Asmara',
        'description' : 'Menghargai kecil dan menyempurnakan aspek-aspek kecil dalam percintaan akan memperkuat ikatan.'
    },
    {
        'title' : 'Asmara',
        'description' : 'Kejujuran dan kepercayaan tetap menjadi prioritas, membantu mengatasi segala tantangan bersama-sama.'
    },
    {
        'title' : 'Asmara',
        'description' : 'merasa terdorong untuk menjelajahi dan memperluas horison dalam hubungan'
    },
    {
        'title' : 'Asmara',
        'description' : 'Membangun kepercayaan dan keterikatan yang kuat akan membantu mereka mengatasi segala rintangan.'
    },
    {
        'title' : 'Asmara',
        'description' : 'Memberikan ruang bagi pertumbuhan individu sambil tetap terhubung secara emosional akan memperkuat ikatan.'
    },
    {
        'title' : 'Asmara',
        'description' : 'Manfaatkan intuisi untuk mendukung dan memahami pasangan secara lebih dalam.'
    },

    //karir
    {
        'title' : 'Karir',
        'description' : 'Ide-idemu akan didengar dan dihargai oleh rekan kerja dan atasan.'
    },
    {
        'title' : 'Karir',
        'description' : 'Kerja kerasmu akan membuahkan hasil yang baik. Hindari konflik dengan rekan kerja dan jaga komunikasi yang harmonis.'
    },
    {
        'title' : 'Karir',
        'description' : 'Terus berusaha dan jangan mudah menyerah dalam mencari pekerjaan. Peluang bagus mungkin akan datang secara tiba-tiba.'
    },
    {
        'title' : 'Karir',
        'description' : 'waspadalah terhadap persaingan yang tidak sehat. Tetap fokus pada strategi bisnis yang kamu jalankan.'
    },
    {
        'title' : 'Karir',
        'description' : 'Jangan ragu untuk meminta masukan dari atasan untuk meningkatkan performa kerja.'
    },
    {
        'title' : 'Karir',
        'description' : 'cobalah untuk tenang dan berpikir jernih. Cari solusi terbaik dan komunikasikan dengan rekan kerja atau atasan.'
    },
    {
        'title' : 'Karir',
        'description' : 'cobalah untuk berinovasi dan mengikuti tren yang sedang berkembang. Peluang untuk mengembangkan bisnis akan terbuka lebar.'
    },
    {
        'title' : 'Karir',
        'description' : 'jangan ragu untuk meminta bantuan dari rekan kerja atau atasan yang kamu percaya. Mereka akan dengan senang hati membantumu'
    },
    {
        'title' : 'Karir',
        'description' : 'Peluang untuk mendapatkan keuntungan akan terbuka lebar. Selalu kerjakan tugas secara detail dan teliti.'
    },
    {
        'title' : 'Karir',
        'description' : 'Memang tidak mudah untuk mendamaikan pekerjaan dan kehidupan keluargamu, tetapi kamu akan berhasil melakukannya.'
    },
    {
        'title' : 'Karir',
        'description' : 'Masalah dengan rekan kerjamu tampaknya tidak dapat dihindari, namun kamu dapat memilih untuk menyikapinya dengan tenang dan tegas.'
    },
    {
        'title' : 'Karir',
        'description' : 'Bintang-bintang memberi kamu lampu hijau dalam hal perencanaan ulang keuangan.'
    },
    {
        'title' : 'Karir',
        'description' : 'Jalin komunikasi dengan seseorang yang memiliki waktu untuk membantu kamu mencapai tujuan cobalah untuk memperluas jaringan pertemanan. Peluang kerja mungkin bisa datang dari koneksi yang kamu miliki.'
    },

    {
        'title' : 'Karir',
        'description' : 'Hari ini kamu akan menikmati mempelajari satu atau dua trik yang akan memberi kamu keuntungan finansial.'
    },
    {
        'title' : 'Karir',
        'description' : 'Waspadai beberapa peluang keuangan yang sedang naik daun, dan tipe orang agresif yang mungkin mencoba menghentikanmu.'
    },
    {
        'title' : 'Karir',
        'description' : 'Kemungkinan perubahan positif dalam kehidupan profesional kamu, seperti lamaran pekerjaan yang akan membuat kamu terpesona.'
    },

    //keuangan
    {
        'title' : 'Keuangan',
        'description' : 'Berhati-hatilah agar kamu tidak terjebak dalam pemborosan demi kesenangan pamer yang sia-sia.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'tetap ada peluang untuk meningkatkan pendapatan.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Tetaplah berhati-hati dalam mengambil keputusan, utamanya di sektor investasi.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Prospek keuangan masih ada, namun diprediksi adanya tantangan finansial di awal.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Pilih investasi yang tidak hanya fokus pada keuntungan jangka pendek dengan risiko besar.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Banyak pengeluaran tak terduga yang diprediksi dapat meningkatkan potensi kerugian finansial.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Praktikkan pola hidup seimbang, konsumsi makanan sehat, dan olahraga dengan tepat.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'memiliki peluang untuk mendapatkan keuntungan finansial yang signifikan.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'Kondisi keuangan bisa membaik dengan keberuntungan yang didapatkan dari sisi karier.'
    },

    {
        'title' : 'Keuangan',
        'description' : 'Keputusan investasi yang tepat akan membawa pendapatan tak terduga.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'perlu berhati-hati dalam menjaga kekayaan dan mengelola keuangan agar tidak mengalami kesulitan finansial.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'perlu berhati-hati agar dapat menghindari pengeluaran secara impulsif.'
    },
    {
        'title' : 'Keuangan',
        'description' : 'hindari pemborosan dan buatlah anggaran yang sesuai dengan kebutuhan.'
    },

    //kesehatan
    {
        'title' : 'Kesehatan',
        'description' : 'Kurangi stres akibat pekerjaan menumpuk dengan menenangkan diri melalui yoga atau meditasi lainnya.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'Seimbangkan kehidupan kerja dan pribadi. Luangkan waktu untuk beristirahat dengan cukup agar kesehatan terjaga.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'melakukan latihan fisik guna menjaga keseimbangan tubuh dapat berdampak baik pada kondisi tubuh.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'Ada kemungkinan cedera dan masalah kesehatan ringan lainnya yang perlu menjadi perhatian.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'tidak menemui kendala berarti yang berdampak pada kesehatan fisik sepanjang tahun ini.'
    },
    {
        'title' : 'Kesehatan',
        'description' : ' Praktikkan pola hidup seimbang, konsumsi makanan sehat, dan olahraga dengan tepat.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'perlu meluangkan waktu untuk beristirahat agar terhindar dari berbagai penyakit, seperti masuk angin.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'Tingkatkan kewaspadaan dalam kehidupan sehari-hari agar risiko cedera maupun kecelakaan dapat diminimalisasi.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'Kembalikan energi dengan melakukan relaksasi dan beristirahat yang cukup untuk menghindari rasa lelah berlebih.'
    },
    {
        'title' : 'Kesehatan',
        'description' : 'Menyeimbangkan waktu untuk kerja dan istirahat merupakan hal penting yang perlu diingat untuk menjaga kesehatan tubuh.'
    },

]

const data = [
    { text: "aku adalah anak gembala selalu sedang dan gembira", imageUrl: "https://www.maybank.co.id/-/media/Article/Isi-Ulang-Pulsa-dan-Top-Up-Paket-Data-Via-M2U-ID-App-Agar-silahturahmi-tidak-terputus.jpg?h=370&la=id&w=540&hash=F178274FB5F6E905FDE740AB2B148A6CE9C8B2AC" },
    { text: "kau pikir kau lah segalanya, tuk ditakuti dan juga tuk di kagumi walau mempesona", imageUrl: "https://www.maybank.co.id/-/media/Article/Mudah-dan-Praktis-Tarik-Tunai-Tanpa-Kartu.jpg?h=370&la=id&w=540&hash=6A5BFAB2E634B14B3A55F894F266C7C35925CBC9" },
    { text: "kamu akan mendapatkan sesuatu yang sangat berharga dan kamu dambakan selama ini dalam beberapa hari kedepan", imageUrl: "https://www.maybank.co.id/-/media/Article/Tips-dan-cara-investasi-emas-secara-berkala-di-M2U-ID-App.jpg?h=370&la=id&w=540&hash=081E045B6EB975CCB81F07B96169ADEE2E8E0F84" }
  ];
  function connect() {
    let uniqueId = window.settings.username || $('#uniqueIdInput').val();
    if (uniqueId !== '') {

        $('#stateText').text('Connecting...');

        connection.connect(uniqueId, {
            enableExtendedGiftInfo: true,
            enableWebsocketUpgrade: true,
        }).then(state => {
            $('#stateText').text(`Connected to roomId ${state.roomId}`);

            // reset stats
            viewerCount = 0;
            likeCount = 0;
            diamondsCount = 0;
            updateRoomStats();

        }).catch(errorMessage => {
            $('#stateText').text(errorMessage);

            // schedule next try if obs username set
            if (window.settings.username) {
                setTimeout(() => {
                    connect(window.settings.username);
                }, 30000);
            }
        })

    } else {
        alert('no username entered');
    }
}

// Prevent Cross site scripting (XSS)
function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function updateRoomStats() {
    $('#roomStats').html(`Viewers: <b>${viewerCount.toLocaleString()}</b> Likes: <b>${likeCount.toLocaleString()}</b> Earned Diamonds: <b>${diamondsCount.toLocaleString()}</b>`)
}

function generateUsernameLink(data) {
    return `<a class="usernamelink" href="https://www.tiktok.com/@${data.uniqueId}" target="_blank">${data.uniqueId}</a>`;
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}



//bubble
var bubbleCount = 0
/**
 * Add a new message to the chat container
 */
function addChatItem(color, data, text, summarize) {
    let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.chatcontainer');

    if (container.find('div').length > 500) {
        container.find('div').slice(0, 200).remove();
    }

    container.find('.temporary').remove();;

    container.append(`
        <div class=${summarize ? 'temporary' : 'static'}>
            <img class="miniprofilepicture" src="${data.profilePictureUrl}">
            <span>
                <b>${generateUsernameLink(data)}:</b>
                <span style="color:${color}">${sanitize(text)}</span>
            </span>
        </div>
    `);

    container.stop();
    container.animate({
        scrollTop: container[0].scrollHeight
    }, 400);
}

var checkSpeech = false;
let isSpeaking = false;
let speechQueue = [];

// Function to handle button click
async function startButtonClick() {
    if (isSpeaking) {
        // If speaking, add to queue
        speechQueue.push(...textImageList);
        return;
    }

    isSpeaking = true;
    for (const item of textImageList) {
        changeImage(item.imageUrl);
        await speakText(item.text);
    }
    isSpeaking = false;

    // Check if there are items in the queue
    if (speechQueue.length > 0) {
        const queuedItems = speechQueue.splice(0, speechQueue.length);
        await startButtonClick(); // Recursive call to process queue
    }
}

// Function to speak text
function speakText(text) {
    return new Promise((resolve, reject) => {
        var utterance = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        utterance.voice = voices[11]; //set default google bahasa indonesia
        utterance.rate = 10 / 10;
        utterance.pitch = 1;
        utterance.text = text;

        utterance.onend = resolve;
        utterance.onerror = reject;
        window.speechSynthesis.speak(utterance);
        isSpeaking = false;
    });
  }

  // Function to change image
  function changeImage(imageUrl, name, title, description) {
    return new Promise((resolve, reject) => {
        const imageElement = document.getElementById("image");
        imageElement.onload = resolve;
        imageElement.onerror = reject;
        imageElement.src = imageUrl;

        $('#name').text(name)
        $('#title').text(title);
        $('#description').text(description);

    });
  }

var isGift = false;
var iJoin = 0;
function addJoinItem(data, text) {
    let container = location.href.includes('obs.html') ? $('#bubbles') : $('#bubbles');

    if(bubbleCount == 20) bubbleCount = 0;

    bubbleCount += 1

    $('#bubble-text-' + bubbleCount).text(data.uniqueId);
    document.getElementById('bubble-' + bubbleCount).style.backgroundImage="url('" + data.profilePictureUrl + "')";

    //voice greeting
    var profileName = data?.nickname?.toString().toLowerCase().replace('_', ' ').replace('.', ' ');

    iJoin = iJoin + 1;
    if(iJoin == 5){
        if(speechQueue.length == 0 && isLooping == false){
            isSpeaking = true;
            speakText('Selamat datang kak ' + profileName + ', semoga sehat selalu')
        }
        iJoin = 0;
    }

}


/**
 * Add a new gift to the gift container
 */
var iGiftCount = 0;
async function addGiftItem(data) {
    let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.giftcontainer');
    if (container.find('div').length > 200) {
        container.find('div').slice(0, 100).remove();
    }

    let streakId = data.userId.toString() + '_' + data.giftId;
    let htmlData = `
        <div data-streakid=${isPendingStreak(data) ? streakId : ''}>
            <img class="miniprofilepicture" src="${data.profilePictureUrl}">
            <span>
                <b>${generateUsernameLink(data)}:</b> <span>${data.describe}</span><br>
                <div>
                    <table>
                        <tr>
                            <td><img class="gifticon" src="${data.giftPictureUrl}"></td>
                            <td>
                                <span>Name: <b>${data.giftName}</b> (ID:${data.giftId})<span><br>
                                <span>Repeat: <b style="${isPendingStreak(data) ? 'color:red' : ''}">x${data.repeatCount.toLocaleString()}</b><span><br>
                                <span>Cost: <b>${(data.diamondCount * data.repeatCount).toLocaleString()} Diamonds</b><span>
                            </td>
                        </tr>
                    </tabl>
                </div>
            </span>
        </div>
    `;

    let html = htmlData;

    let existingStreakItem = container.find(`[data-streakid='${streakId}']`);

    if (existingStreakItem.length) {
        existingStreakItem.replaceWith(html);
    } else {
        container.append(html);
    }

    container.stop();
    container.animate({
        scrollTop: container[0].scrollHeight
    }, 800);

    var profileName = data.nickname.toString().toLowerCase().replace('_', ' ').replace('.', ' ');

    var count = models.length;
    var randomNumber = Math.floor(Math.random() * (count - 1 + 1)) + 1;
    if(randomNumber <= 0 || randomNumber >= models.length){
        randomNumber = 1;
    }
    console.log(randomNumber)
    var model = models[randomNumber];

    //baru
    // await changeImage(data.profilePictureUrl, profileName, model['title'], model['description']);
    // await speakText(model['description']);

    iGiftCount = iGiftCount+ 1;
    var model = {
        id: iGiftCount,
        image: data.profilePictureUrl,
        profileName: data.uniqueId + "(" + profileName + ")",
        title: model['title'],
        description: model['description']
    }
    speechQueue.push(model);

    return
}
setInterval(runGiftSpeech, 10000);
var isLooping = false;
async function runGiftSpeech(){
    if(speechQueue.length > 0 && isSpeaking == false && isLooping == false){

        speechQueue.sort((a, b) => a.id - b.id);
        console.log(speechQueue)
        speechQueue.forEach(async function(item, index){
            if(isSpeaking){
                setInterval(null, 20000);
            }

            console.log('after deleted')
            console.log(speechQueue)
            isLooping = true
            isSpeaking = true;
            await changeImage(item.image, item.profileName, item.title, item.description);
            await speakText(item.description);

            if(index == speechQueue.length){
                isLooping = false;
            }
            deleteObjectById(item.id)
        })
        isLooping =false;
    }

}
// Function to delete an object from the list at a specific index
function deleteObjectFromList(list, index) {
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
    }
  }

function deleteObjectById(id) {
    speechQueue = speechQueue.filter(model => model.id !== id);
}

// Function to update an object from the list at a specific index
function updateValueInList(list, index, propertyName, newValue) {
    if (index >= 0 && index < list.length) {
      list[index][propertyName] = newValue;
    }
  }


// viewer stats
connection.on('roomUser', (msg) => {
    if (typeof msg.viewerCount === 'number') {
        viewerCount = msg.viewerCount;
        updateRoomStats();
    }
})

// like stats
connection.on('like', (msg) => {
    if (typeof msg.totalLikeCount === 'number') {
        likeCount = msg.totalLikeCount;
        updateRoomStats();
    }

    if (window.settings.showLikes === "0") return;

    if (typeof msg.likeCount === 'number') {
        addChatItem('#447dd4', msg, msg.label.replace('{0:user}', '').replace('likes', `${msg.likeCount} likes`))
    }

    if(bubbleCount == 20) bubbleCount = 0;

    bubbleCount += 1
    $('#bubble-text-' + bubbleCount).text(msg.uniqueId);
    document.getElementById('bubble-' + bubbleCount).style.backgroundImage="url('" + msg.profilePictureUrl + "')";

})

// Member join
let joinMsgDelay = 0;
connection.on('member', (msg) => {
    if (window.settings.showJoins === "0") return;

    let addDelay = 250;
    if (joinMsgDelay > 500) addDelay = 100;
    if (joinMsgDelay > 1000) addDelay = 0;

    joinMsgDelay += addDelay;

    setTimeout(() => {
        joinMsgDelay -= addDelay;
        addChatItem('#21b2c2', msg, 'joined', true);
        addJoinItem(msg, 'joined')
    }, joinMsgDelay);
})

// New chat comment received
connection.on('chat', async (msg) => {
    if (window.settings.showChats === "0") return;

    await addChatCommentItem(msg, msg.comment)
    addChatItem('', msg, msg.comment);
})
var iComment = 0
async function addChatCommentItem(data, chatText) {
    let container = location.href.includes('obs.html') ? $('#bubbles') : $('#bubbles');

    if(bubbleCount == 20) bubbleCount = 0;

    bubbleCount += 1

    $('#bubble-text-' + bubbleCount).text(data.uniqueId);
    document.getElementById('bubble-' + bubbleCount).style.backgroundImage="url('" + data.profilePictureUrl + "')";

    //voice greeting
    var profileName = data?.nickname?.toString().toLowerCase().replace('_', ' ').replace('.', ' ');

    //check format comment
    if(checkFormat(chatText) == false) return

    console.log(chatText.replace('Nama:', '').replace('Nama : ', ''));
    iComment = iComment + 1;
    // if(iComment == 3){
        if(speechQueue.length == 0 && isLooping == false){
            isSpeaking = true;
            var count = models.length;
            var randomNumber = Math.floor(Math.random() * (count - 1 + 1)) + 1;
            if(randomNumber <= 0 || randomNumber >= models.length){
                randomNumber = 1;
            }
            var model = models[randomNumber];
            await changeImage(
                data.profilePictureUrl,
                chatText.replace('nama:', '').replace('nama : ', ''),
                model['title'], model['description']
            );
            await speakText(model['description']);
        }
        iComment = 0;
    // }



}

function checkFormat(inputString) {
    // Define the regular expression pattern
    var pattern = /^nama\s*:\s*[a-zA-Z]+$/;

    // Test the input string against the pattern
    if (pattern.test(inputString)) {
        return true; // Format matches
    } else {
        return false; // Format doesn't match
    }
}


// New gift received
connection.on('gift', async (data) => {
    isGift = true;
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        diamondsCount += (data.diamondCount * data.repeatCount);
        updateRoomStats();
        await addGiftItem(data);
    }

    if (window.settings.showGifts === "0") return;

})

// share, follow
connection.on('social', (data) => {
    if (window.settings.showFollows === "0") return;

    let color = data.displayType.includes('follow') ? '#ff005e' : '#2fb816';
    addChatItem(color, data, data.label.replace('{0:user}', ''));
})

connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');

    // schedule next try if obs username set
    if (window.settings.username) {
        setTimeout(() => {
            connect(window.settings.username);
        }, 30000);
    }
})