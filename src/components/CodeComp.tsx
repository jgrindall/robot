//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';

const code = "print(1)";

function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined){
       throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
}

Sk.configure({
  output: outf,
  read: builtinRead,
  __future__: Sk.python3
});

const runit = ()=>{
   var prog = document.getElementById("yourcode").value;
   var mypre = document.getElementById("output");
   mypre.innerHTML = '';
   var myPromise = Sk.misceval.asyncToPromise(function() {
       debugger;
       console.log(prog);
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(
     function(mod) {
       console.log('success');
     },
     function(err) {
       console.log(err);
    });
};

class CodeComp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
      this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        runit();
    }


    render() {
      return <div>
            <form>
                <textarea id="yourcode" cols="40" rows="10" defaultValue={code}></textarea>
                <br />
                <button type="button" onClick={this.handleClick}>Run</button>
            </form>
            <pre id="output" ></pre>
        </div>;
    }
}

export default CodeComp;
