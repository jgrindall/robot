//https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de
import * as React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";

const code = 'import mynewmodule.func\nprint("imported")\nr=mynewmodule.func.Stack(4)\nr.push(10)\nr.push(20)\nr2=r.push2()\nprint(r2)\ns1=r.tostr()\nprint(s1)\na= mynewmodule.func.fact(10)\nprint(a)\nprint("done")';

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

class RobotObject{
  constructor(params){
    this.stack = [];
  }
  push(v){
    this.stack.push(v);
  }
  toString2(){
    return "apple";
  },
  toString(){
    return JSON.stringify(this.stack);
  }
  move(){

  }
}

Sk.__robot__ = {
  make:function(params){
    return new RobotObject(params);
  }
};

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
      this.state = {code: code};
    }


    handleClick() {
        runit();
    }

    onChange(newValue) {
     console.log("change", newValue);
     this.setState(state => ({ code: newValue }));
   }

    render() {
      return <div>
            <button type="button" onClick={this.handleClick.bind(this)}>Run</button>

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
