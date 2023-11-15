"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6726],{5065:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>a,contentTitle:()=>n,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var t=s(5893),c=s(1151);const r={title:"MACI Circuits",description:"Introduction to the core zk-SNARK circuits of MACI",sidebar_label:"Circuits",sidebar_position:6},n="Circuits",o={id:"circuits",title:"MACI Circuits",description:"Introduction to the core zk-SNARK circuits of MACI",source:"@site/docs/circuits.md",sourceDirName:".",slug:"/circuits",permalink:"/maci/docs/circuits",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/circuits.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"MACI Circuits",description:"Introduction to the core zk-SNARK circuits of MACI",sidebar_label:"Circuits",sidebar_position:6},sidebar:"docSidebar",previous:{title:"Smart Contracts",permalink:"/maci/docs/contracts"},next:{title:"Trusted Setup",permalink:"/maci/docs/trusted-setup"}},a={},l=[{value:"Compile circuits",id:"compile-circuits",level:2},{value:"Measure the circuit sizes",id:"measure-the-circuit-sizes",level:2},{value:"Download the <code>.ptau</code> file",id:"download-the-ptau-file",level:2},{value:"Generate <code>.zkey</code> files",id:"generate-zkey-files",level:2}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,c.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"circuits",children:"Circuits"}),"\n",(0,t.jsx)(i.p,{children:"MACI has three zk-SNARK circuits:"}),"\n",(0,t.jsxs)(i.ol,{children:["\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"ProcessMessages.circom"}),", which takes a batch of messages, and updates the\nstate and ballot trees according to the contents of said messages."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"TallyVotes.circom"}),", which counts votes from users' ballots, batch by batch."]}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.code,{children:"Subsidy.circom"}),", which implements ",(0,t.jsx)(i.a,{href:"https://hackmd.io/@chaosma/H1_9xmT2K",children:"pairwise subsidy"})]}),"\n"]}),"\n",(0,t.jsxs)(i.p,{children:["Each circuit is parameterised and it is important to set the right parameters\nto your use case. For example, if you want to support up to 3125 messages, the message tree depth parameter should be set to ",(0,t.jsx)(i.code,{children:"5"})," (as $5^5 = 3125$)."]}),"\n",(0,t.jsxs)(i.p,{children:["Next, navigate to the ",(0,t.jsx)(i.code,{children:"cli/"})," directory and edit ",(0,t.jsx)(i.code,{children:"zkeys.config.yml"}),"."]}),"\n",(0,t.jsx)(i.p,{children:"This config file defines the parameters required for MACI's circuits."}),"\n",(0,t.jsx)(i.h2,{id:"compile-circuits",children:"Compile circuits"}),"\n",(0,t.jsx)(i.p,{children:"Run:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"npx zkey-manager compile -c ./zkeys.config.yml\n"})}),"\n",(0,t.jsx)(i.p,{children:"The larger the trees, the more time this process may take. You may also need a\nmachine with a very large amount of memory."}),"\n",(0,t.jsx)(i.h2,{id:"measure-the-circuit-sizes",children:"Measure the circuit sizes"}),"\n",(0,t.jsxs)(i.p,{children:["The size of a circuit is denoted by its number of constraints. The larger this\nnumber, the more time it takes to compile it, generate its ",(0,t.jsx)(i.code,{children:".zkey"})," file, and\nperform phase 2 contributions."]}),"\n",(0,t.jsx)(i.p,{children:"Run this command to measure a circuit:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"npx snarkjs r1cs info CIRCUIT_NAME.circom\n"})}),"\n",(0,t.jsxs)(i.h2,{id:"download-the-ptau-file",children:["Download the ",(0,t.jsx)(i.code,{children:".ptau"})," file"]}),"\n",(0,t.jsxs)(i.p,{children:["This file should be the result of the Perpetual Powers of Tau trusted setup\ncontribution which ",(0,t.jsx)(i.a,{href:"https://blog.hermez.io/hermez-cryptographic-setup/",children:"Hermez Network\nselected"}),"."]}),"\n",(0,t.jsx)(i.p,{children:"Run:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"npx zkey-manager downloadPtau -c ./zkeys.config.yml\n"})}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.code,{children:"zkey-manager"})," will select the smallest ",(0,t.jsx)(i.code,{children:".ptau"})," file that fits the largest\ncircuit specified in ",(0,t.jsx)(i.code,{children:"zkeys.config.yml"}),"."]}),"\n",(0,t.jsxs)(i.h2,{id:"generate-zkey-files",children:["Generate ",(0,t.jsx)(i.code,{children:".zkey"})," files"]}),"\n",(0,t.jsx)(i.p,{children:"Run:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-bash",children:"npx zkey-manager genZkeys -c ./zkeys.config.yml\n"})}),"\n",(0,t.jsxs)(i.p,{children:["This generates the initial ",(0,t.jsx)(i.code,{children:".zkey"})," files for each circuit."]}),"\n",(0,t.jsx)(i.p,{children:"You should perform at least one contribution to each circuit, even if you\nchoose not to perform a multi-party trusted setup."})]})}function h(e={}){const{wrapper:i}={...(0,c.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,i,s)=>{s.d(i,{Z:()=>o,a:()=>n});var t=s(7294);const c={},r=t.createContext(c);function n(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:n(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);