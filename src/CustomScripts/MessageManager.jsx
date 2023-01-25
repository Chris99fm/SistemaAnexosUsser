class MessageManager{
    static Showtime=500;
    static createMsg(text, color){
        window.localStorage.setItem('color', color);
        window.localStorage.setItem('msg', text);
    }
    static deleteMsg(){
        window.localStorage.removeItem('msg');
        window.localStorage.removeItem('color');
    }
    static showMsg(){
        const msg = window.localStorage.getItem('msg');
        const color =  window.localStorage.getItem('color')
        const DisplayMsg = [];
        if (msg){
            DisplayMsg.push(
                <div key='msg' id='msg' style={{backgroundColor:color}}>{msg}</div>
            );
            //this.deleteMsg();
            setTimeout(()=> {
                this.deleteMsg();
            },this.Showtime*1000)
        }
        return DisplayMsg;
    }
}
export default MessageManager;