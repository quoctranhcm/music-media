const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const heading = $('header h2');
const cd =$('.cd');
const cdThumb =$('.cd-thumb');
const audio =$('#audio');
const playBtn =$('.btn-toggle-play')
const player=$('.player');
const btnNext=$('.btn-next')
const btnPrev=$('.btn-prev')
const btnRandom=$('.btn-random')
const btnRepeat=$('.btn-repeat')
const volumeIcon =$('.btn-volume')
const volumeSet =$('#volumeAdjust')
const progress=$('.progress')
const arrRandom=[]
const playlist =$('.playlist')
const PlAYER_STORAGE_KEY = "F8_PLAYER";



const app ={

    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat: false,
    isTimeUpdate: true,
    isVolumeMute:false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {
      isRepeat: false,
      isRandom:false,
      current: 0,
      currentvolume:1
    },
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
      
    },
    songs: [
      {
        name: "Nevada",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./assets/music/Nevada_song1.mp3",
        image:
          "https://i1.sndcdn.com/artworks-000313122243-4hxho9-t500x500.jpg"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
          "./assets/music/Damn_song2.mp3",
        image:
          "https://i.ytimg.com/vi/yBRKqRc-vyQ/maxresdefault.jpg"
      },
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./assets/music/Click Pow Get Down_song3.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
          },
          {
            name: "Lemon Tree",
            singer: "DJ DESA REMIX",
            path:
              "./assets/music/LemonTree_song4.mp3",
            image: "https://i.ytimg.com/vi/V8lQZzsbP1w/maxresdefault.jpg"
          },
          {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./assets/music/MantoiyatSong_song5.mp3",
            image:
              "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
          },
          {
            name: "They Said",
            singer: "BinZ",
            path: "./assets/music/TheySaid_song6.mp3",
            image:
              "https://i.ytimg.com/vi/XdBsAXOxYfo/hqdefault.jpg"
          },
          {
            name: "MotTrieuLike",
            singer: "Đen Vâu",
            path: "./assets/music/motTrieuLike_song7.mp3",
            image:
              "https://media-cdn.laodong.vn/storage/newsportal/2021/5/27/914069/D1.jpg?w=414&h=276&crop=auto&scale=both"
          },
          {
            name: "Sugar",
            singer: "Maroon 5",
            path: "./assets/music/Sugar_song8.mp3",
            image:
              "https://nld.mediacdn.vn/thumb_w/540/2015/24b3d48100000578-2910524-image-m-60-1421273957616-1421291152669.jpg"
          },
          {
            name : "Attention",
            singer: "Charlie Puth",
            path: "./assets/music/Attention_song9.mp3",
            image:
              "https://1.bp.blogspot.com/-JFZR9yw6td0/XRA-6gJsWUI/AAAAAAAAACs/_n6TS5VmOBgX-AihhbwnmpVSpKTTK8HRwCLcBGAs/s1600/cam-am-attention.jpg"
          },
          {
            name : "My love",
            singer: "Westlife",
            path: "./assets/music/Mylove _song10.mp3",
            image:
              "https://i.ytimg.com/vi/RrG9zXeVBok/maxresdefault.jpg"
          },
          {
            name : "Rồi Tới Luôn",
            singer: "Nal",
            path: "./assets/music/RoiToiLuon_song11.mp3",
            image:
              "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/a/9/e/e/a9ee81fdd1c2b569c1c9631e969ea0aa.jpg"
          },
         
        ],
        
        render: function(){
          
          var html= this.songs.map((song,index)=>{
                return `
                <div class="song " data-index=${index}>
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>`
            
            })
            $('.playlist').innerHTML=html.join('');
            
        },
        
        defineProperties: function(){
          Object.defineProperty(this,'currentSong',{
            get: function(){
              return this.songs[this.currentIndex]
            }
          })
        },
        loadCurrentSong: function(){
          heading.textContent=this.currentSong.name;
          cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`;
          audio.src=this.currentSong.path;

        },
        handleEvents:function(){
            const _this=this;
            const cdWidth = cd.offsetWidth;
            
            //xử lý CD quay/dừng
            const cdThumbAnimate= cdThumb.animate([
              {transform: 'rotate(360deg)'}
            ],{
              duration: 10000,
              iterations: Infinity
            })
            cdThumbAnimate.pause();
          // phóng to thu nhỏ CD
            document.onscroll= function(){
                const scrollTop=window.scrollY || document.documentElement.scrollTop;
                const newCdWidth=cdWidth - scrollTop;
                cd.style.width=newCdWidth >0 ? newCdWidth +'px' : 0;
                cd.style.opacity=newCdWidth / cdWidth;
            }
            // xử lý khi click play
            playBtn.onclick=function(){
              if(_this.isPlaying){
                audio.pause();
              }
              else{
                audio.play();  
              }
            
            }
            // khi song được play
            audio.onplay=function(){
              _this.isPlaying=true;
              player.classList.add('playing')
              cdThumbAnimate.play();           

            }
            //khi song bị pause
            audio.onpause=function(){
              _this.isPlaying =false;
              player.classList.remove('playing')
              cdThumbAnimate.pause();
              // console.log(_this.currentIndex)

            } 

            // khi tiến độ bài hát thay đổi
            audio.ontimeupdate=function(){
              if(audio.duration && _this.isTimeUpdate){
                const progressPercent =Math.floor(audio.currentTime/audio.duration*100);
                progress.value = progressPercent;  

              }
              // console.log(_this.isTimeUpdate)
            }
            // khi tua bài hát
            progress.onmousedown=function(){
                _this.isTimeUpdate=false;
            }
            progress.onchange=function(e){
              const seekTime=e.target.value*audio.duration/100;
              audio.currentTime=seekTime;
              _this.isTimeUpdate=true;

            }

            //khi next bài hát
            btnNext.onclick=function(){
              if(_this.isRandom){
                _this.randomSong()
              }else
              {
                _this.nextSong();
              }
              audio.play();
              _this.activeSong();
              _this.scrollToActiveSong();
              _this.setConfig('current',_this.currentIndex)

              
            }
            btnPrev.onclick=function(){
              if(_this.isRandom){
                _this.randomSong();
                
              }else
              {
                _this.prevSong();
              }
              audio.play();
              _this.activeSong();
              _this.scrollToActiveSong();
              _this.setConfig('current',_this.currentIndex)
            }
            //khi click random bài hát
            btnRandom.onclick=function(){
              _this.isRandom=!_this.isRandom;
              _this.setConfig('isRandom',_this.isRandom)
              btnRandom.classList.toggle('active',_this.isRandom)
              arrRandom.length=[];
        
            }

            // xử lý next song khi audio kết thúc
            audio.onended = function(){
              if(_this.isRepeat){
                audio.play();
              }else{
                btnNext.click();
              }
              
            }
            // xử lý khi click repeat bài hát
            btnRepeat.onclick=function(e){
              _this.isRepeat=!_this.isRepeat;
              _this.setConfig('isRepeat',_this.isRepeat)
              btnRepeat.classList.toggle('active',_this.isRepeat)
            }

            //lắng nghe hành vi click vào playlist
            playlist.onclick=function(e){
              const songNode= e.target.closest('.song:not(.active)')
              if(songNode || e.target.closest('.option')){
                if(songNode){
                  _this.currentIndex= Number(songNode.dataset.index)
                  _this.loadCurrentSong();
                  _this.activeSong();
                  _this.setConfig('current',_this.currentIndex)
                  audio.play();

                }
                //xu ly khi click vào song opton
                if(e.target.closest('.option')){

                }    
              }
            }
            // lắng nghe hành vi khi kéo thanh volume
            
            volumeSet.oninput=function(e){
              // volumeSet.value=e.target.value;
               audio.volume = e.target.value/100;
               _this.iconVolume();
              _this.setConfig('currentvolume',audio.volume);
             
            }
            volumeIcon.onclick=function(e){
              _this.isVolumeMute=!_this.isVolumeMute
              if(_this.isVolumeMute){
                volumeIcon.classList.add('volume-mute'); 
                audio.volume=0;
                volumeSet.value=0

              }else{
                volumeIcon.classList.remove('volume-mute');
                audio.volume=_this.config.currentvolume;
                volumeSet.value=audio.volume*100;
              }
            }

            
        },
        nextSong: function(){
          this.currentIndex++;
          if(this.currentIndex>=this.songs.length){
            this.currentIndex=0;
          }
          this.loadCurrentSong();
        },
        activeSong: function(){
          const active=$$('.song');
          active.forEach((song,index)=>{
              if(song.classList.contains('active')){
                song.classList.remove('active')
              }
              if(this.currentIndex===index){
                song.classList.add('active')
              }
          })
      },
        prevSong: function(){
          this.currentIndex--;
          if(this.currentIndex < 0){
              this.currentIndex=this.songs.length - 1;
          }
          this.loadCurrentSong();
        },
        randomSong: function(){  
            if(arrRandom.length == this.songs.length-1){
              arrRandom.length=[];
              arrRandom.push(this.currentIndex);
             }else{
              arrRandom.push(this.currentIndex);
            }
              do{
                var newIndex=Math.floor(Math.random()*this.songs.length);
                var duplicate =arrRandom.some(function(arr){
                return arr=== newIndex;
                })

              }while(duplicate)  
              this.currentIndex=newIndex;
              console.log(arrRandom)
              this.loadCurrentSong()
        
              // do{
                
              //   var newIndex=Math.floor(Math.random()*this.songs.length)

              // }
              // while(newIndex ==this.currentIndex && a)
        },
        scrollToActiveSong:function(){
            setTimeout(function(){
                $('.song.active').scrollIntoView({
                  behavior:'smooth',
                  block:'center'
                });
            },300)
        },
        volumeSong: function(){
            audio.volume=this.config.currentvolume;
            volumeSet.value=audio.volume*100;
            this.iconVolume();
        },
        iconVolume:function(){
          if(audio.volume <= 0.5 && audio.volume > 0){
            volumeIcon.classList.add('volume-down')
            volumeIcon.classList.remove('volume-mute')
          }else if(audio.volume > 0.59){
            volumeIcon.classList.remove('volume-down')
            volumeIcon.classList.remove('volume-mute')
          }else if(audio.volume ==0){
            volumeIcon.classList.add('volume-mute')
          }
        },
        loadConfig: function(){
          this.isRepeat=this.config.isRepeat;
          this.isRandom=this.config.isRandom;
          this.currentIndex=this.config.current;
          audio.volume=this.config.currentvolume;
        },

        start:function(){
          // load cấu hình config
          this.loadConfig();
          btnRepeat.classList.toggle('active',this.isRepeat)
          btnRandom.classList.toggle('active',this.isRandom)
          
          // định nghĩa các thuộc tính cho Object
          this.defineProperties();
          
          // lắng nghe/ xử lý các sự kiện( DOM event)
          this.handleEvents();
          
          //tải thông tin bài hát đầu tiên vào UI
          this.loadCurrentSong();
          
          // render playlist
          this.render();

          this.activeSong()
          this.scrollToActiveSong()
          this.volumeSong();
        }
    
}
app.start();
