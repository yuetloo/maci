"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4128],{2214:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var i=t(5893),r=t(1151);const o={title:"Introduction to MACI",description:"High-level introduction to Minimum Anti-Collusion Infrastructure (MACI)",sidebar_label:"Introduction",sidebar_position:1},s="Introduction",c={id:"introduction",title:"Introduction to MACI",description:"High-level introduction to Minimum Anti-Collusion Infrastructure (MACI)",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/introduction",permalink:"/maci/docs/introduction",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Introduction to MACI",description:"High-level introduction to Minimum Anti-Collusion Infrastructure (MACI)",sidebar_label:"Introduction",sidebar_position:1},sidebar:"docSidebar",next:{title:"Installation",permalink:"/maci/docs/installation"}},a={},l=[{value:"Credits",id:"credits",level:2}];function d(e){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(n.p,{children:"Minimum Anti-Collusion Infrastructure (MACI) is a base layer for\nbribery-resistant, secure, and private digital voting."}),"\n",(0,i.jsxs)(n.p,{children:["Applications like ",(0,i.jsx)(n.a,{href:"https://clr.fund/",children:"clr.fund"})," build atop MACI to increase\nprivacy and discourage bribery for public goods funding."]}),"\n",(0,i.jsx)(n.p,{children:"MACI offers the following guarantees:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Collusion resistance"}),": no-one except a trusted coordinator should be\ncertain of the validity of a vote, reducing the effectiveness of bribery."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Receipt-freeness"}),": no voter should be able to prove (besides to the coordinator) which way they voted."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Privacy"}),": no-one except a trusted coordinator should be able to decrypt a\nvote."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Uncensorability"}),": no-one \u2014 not even the trusted coordinator \u2014 should be\nable to censor a vote."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Unforgeability"}),": only the owner of a user's private key may cast a vote\ntied to its corresponding public key."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Non-repudiation"}),": no-one may modify or delete a vote after it is cast,\nalthough a user may cast another vote to nullify it."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Correct execution"}),": no-one \u2014 not even the trusted coordinator \u2014 should be\nable to produce a false tally of votes."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Under the hood, MACI uses Ethereum smart contracts and zero-knowledge proofs.\nIt inherits security and uncensorability from the underlying Ethereum\nblockchain, ensures unforgeability via asymmetric encryption, and achieves\ncollusion resistance, privacy, and correct execution via zk-SNARK proofs."}),"\n",(0,i.jsx)(n.p,{children:"Although MACI can provide collusion resistance only if the coordinator is\nhonest, a dishonest coordinator can neither censor nor tamper with its\nexecution."}),"\n",(0,i.jsx)(n.p,{children:"Note that MACI presumes an identity system where each legitimate member\ncontrols a unique Ethereum private key."}),"\n",(0,i.jsxs)(n.p,{children:["MACI was originally proposed by Vitalik Buterin in ",(0,i.jsx)(n.a,{href:"https://ethresear.ch/t/minimal-anti-collusion-infrastructure/5413",children:"this ethresear.ch\npost"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"credits",children:"Credits"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/barryWhiteHat",children:"Barry WhiteHat"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/corydickson",children:"Cory Dickson"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://twitter.com/ChihChengLiang",children:"Chih-Cheng Liang"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://han0110.github.io/",children:"Han Jian"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kndrck.co/",children:"Kendrick Tan"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/xuhcc",children:"Kirill Goncharov"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://kobi.one/",children:"Kobi Gurkan"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://kohweijie.com",children:"Koh Wei Jie"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://twitter.com/xGozzy",children:"Samuel Gosling"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>s});var i=t(7294);const r={},o=i.createContext(r);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);