//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";
import _ from 'underscore';

const code = 'import mynewmodule.func\nprint("imported")\nfor i in range(0,100):\n  a = mynewmodule.func.Box(i)\nso = mynewmodule.func.SleepyObj()\nso.move()\nblob = mynewmodule.func.Blob()\nblob.move()\nr=mynewmodule.func.Stack(4)\nr.push(10)\nr.push(20)\nprint(r)\nprint(r.tostr())\na=mynewmodule.func.fact(10)\nprint(a)\nprint("done")';

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

const timeouts = [];

const clearTimeouts = ()=>{
  _.each(timeouts, timeout=>{
    clearTimeout(timeout);
  });
};

Sk.configure({
  output: outf,
  read: builtinRead,
  debugging: true,
  __future__: Sk.python3,
  setTimeout: (fn, delay) => {
      const timeout = setTimeout(() => {
          if(!Sk.hardInterrupt){
            fn();
        }
      }, delay);
      timeouts.push(timeout);
      console.log(timeouts.length, 'to');
  }
});

Sk.__maker__ = {
  makeBlob:function(params){
    return window.gameManager.addBlob("1234");
  },
  makeBox:function(params){
    return window.gameManager.addBox(params);
  }
};

Sk.builtin.KeyboardInterrupt = function (args) {
    var o;
    if (!(this instanceof Sk.builtin.KeyboardInterrupt)) {
        o = Object.create(Sk.builtin.KeyboardInterrupt.prototype);
        o.constructor.apply(o, arguments);
        return o;
    }
    Sk.builtin.BaseException.apply(this, arguments);
};
Sk.abstr.setUpInheritance("KeyboardInterrupt", Sk.builtin.KeyboardInterrupt, Sk.builtin.BaseException);

const interruptHandler = function (susp) {
   if (Sk.hardInterrupt) {
       throw new Sk.builtin.KeyboardInterrupt('aborted execution');
   }
   else {
       return null; // should perform default action
   }
};

const runit = (prog)=>{
   const mypre = document.getElementById("output");
   mypre.innerHTML = '';
   const susp = {"*": interruptHandler};
   var myPromise = Sk.misceval.asyncToPromise(() => {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   }, susp);
   myPromise.then(
     function(mod) {
       console.log('success');
     },
     function(err) {
       console.log(err);
       if(err instanceof Sk.builtin.KeyboardInterrupt){
         alert('kill');

       }
    });
};

class CodeComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {code: code};
    }

    handleStop(){
      clearTimeouts();
      Sk.hardInterrupt = true;
      window.gameManager.destroyAll();
    }


    handleClick() {
      Sk.hardInterrupt = false;
        runit(this.state.code);
    }

    onChange(newValue) {
     this.setState(state => ({ code: newValue }));
   }

    render() {
      return <div>

            <button type="button" onClick={this.handleClick.bind(this)}>Run</button>
            <button type="button" onClick={this.handleStop.bind(this)}>Stop</button>


            <AceEditor
              mode="python"
              theme="xcode"
              onChange={this.onChange.bind(this)}
              name="UNIQUE_ID_OF_DIV"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.code}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />

            <pre id="output" ></pre>
        </div>;
    }
}

export default CodeComp;
