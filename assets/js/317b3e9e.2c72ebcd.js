"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3826],{3797:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var n=t(5893),i=t(1151);const r={title:"Testing MACI",description:"How to test MACI",sidebar_label:"Testing",sidebar_position:8},c="Testing",a={id:"v1.x/testing",title:"Testing MACI",description:"How to test MACI",source:"@site/docs/v1.x/testing.md",sourceDirName:"v1.x",slug:"/v1.x/testing",permalink:"/maci/docs/v1.x/testing",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/v1.x/testing.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Testing MACI",description:"How to test MACI",sidebar_label:"Testing",sidebar_position:8},sidebar:"docSidebar",previous:{title:"Installation",permalink:"/maci/docs/v1.x/installation"},next:{title:"Trusted Setup",permalink:"/maci/docs/v1.x/trusted-setup"}},o={},l=[{value:"Contracts",id:"contracts",level:2},{value:"CLI",id:"cli",level:2},{value:"Download <code>.zkey</code> files or the witness generation binaries",id:"download-zkey-files-or-the-witness-generation-binaries",level:3},{value:"Compile the witness generation binaries",id:"compile-the-witness-generation-binaries",level:3},{value:"Check the Rapidsnark binary",id:"check-the-rapidsnark-binary",level:3},{value:"Run CLI tests",id:"run-cli-tests",level:3}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"testing",children:"Testing"}),"\n",(0,n.jsx)(s.h2,{id:"contracts",children:"Contracts"}),"\n",(0,n.jsx)(s.p,{children:"First, compile the contracts."}),"\n",(0,n.jsxs)(s.p,{children:["From the main ",(0,n.jsx)(s.code,{children:"maci/"})," directory, run:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts && \\\nnpm run compileSol\n"})}),"\n",(0,n.jsx)(s.p,{children:"To run Contracts only tests, run:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts && \\\nnpm run test\n"})}),"\n",(0,n.jsx)(s.p,{children:"To test the system as a whole, run Hardhat Network (a local Ethereum testnet) in a separate terminal:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"cd contracts && \\\nnpm run test\n"})}),"\n",(0,n.jsx)(s.h2,{id:"cli",children:"CLI"}),"\n",(0,n.jsxs)(s.p,{children:["You can test the CLI locally. First, you need to either generate ",(0,n.jsx)(s.code,{children:".zkey"})," files,\nor download them. Do not use these testing ",(0,n.jsx)(s.code,{children:".zkey"})," files in production."]}),"\n",(0,n.jsxs)(s.h3,{id:"download-zkey-files-or-the-witness-generation-binaries",children:["Download ",(0,n.jsx)(s.code,{children:".zkey"})," files or the witness generation binaries"]}),"\n",(0,n.jsxs)(s.p,{children:["MACI has three zk-SNARK circuits. Each circuit is parameterised. There should one\n",(0,n.jsx)(s.code,{children:".zkey"})," file for each circuit and set of parameters."]}),"\n",(0,n.jsxs)(s.p,{children:["Unless you wish to generate a fresh set of ",(0,n.jsx)(s.code,{children:".zkey"})," files, you should obtain\nthem from someone who has performed a multi-party trusted setup for said\ncircuits."]}),"\n",(0,n.jsxs)(s.p,{children:["Note the locations of the ",(0,n.jsx)(s.code,{children:".zkey"})," files as the CLI requires them as\ncommand-line flags."]}),"\n",(0,n.jsxs)(s.p,{children:["You cand download a ",(0,n.jsx)(s.code,{children:".zkey"})," files and associated ",(0,n.jsx)(s.code,{children:".r1cs"})," file with witness generation binaries from ",(0,n.jsx)(s.a,{href:"https://github.com/privacy-scaling-explorations/maci/wiki/Download-Precompiled-Circuit-and-Zkeys",children:"here"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"compile-the-witness-generation-binaries",children:"Compile the witness generation binaries"}),"\n",(0,n.jsxs)(s.p,{children:["From the main ",(0,n.jsx)(s.code,{children:"maci/cli"})," directory, run:"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"npx zkey-manager compile -c ./zkeys.config.yml\n"})}),"\n",(0,n.jsxs)(s.p,{children:["You should see the following files in ",(0,n.jsx)(s.code,{children:"maci/cli/zkeys/"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"ProcessMessages_10-2-1-2_test\nProcessMessages_10-2-1-2_test.circom\nProcessMessages_10-2-1-2_test.dat\nProcessMessages_10-2-1-2_test.r1cs\nProcessMessages_10-2-1-2_test.sym\nProcessMessages_10-2-1-2_test_cpp\nProcessMessages_10-2-1-2_test_js\nSubsidyPerBatch_10-1-2_test\nSubsidyPerBatch_10-1-2_test.circom\nSubsidyPerBatch_10-1-2_test.dat\nSubsidyPerBatch_10-1-2_test.r1cs\nSubsidyPerBatch_10-1-2_test.sym\nSubsidyPerBatch_10-1-2_test_cpp\nSubsidyPerBatch_10-1-2_test_js\nTallyVotes_10-1-2_test\nTallyVotes_10-1-2_test.circom\nTallyVotes_10-1-2_test.dat\nTallyVotes_10-1-2_test.r1cs\nTallyVotes_10-1-2_test.sym\nTallyVotes_10-1-2_test_cpp\nTallyVotes_10-1-2_test_js\n"})}),"\n",(0,n.jsx)(s.h3,{id:"check-the-rapidsnark-binary",children:"Check the Rapidsnark binary"}),"\n",(0,n.jsxs)(s.p,{children:["Next, ensure that the ",(0,n.jsx)(s.code,{children:"prover"})," binary of ",(0,n.jsx)(s.code,{children:"rapidsnark"})," is in\n",(0,n.jsx)(s.code,{children:"~/rapidsnark/build/prover"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"run-cli-tests",children:"Run CLI tests"}),"\n",(0,n.jsxs)(s.p,{children:["You can find the tests in ",(0,n.jsx)(s.code,{children:"maci/cli/tests"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["e.g. In ",(0,n.jsx)(s.code,{children:"maci/cli/tests/vanilla"}),":"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"./test1.sh\n"})})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>c});var n=t(7294);const i={},r=n.createContext(i);function c(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);