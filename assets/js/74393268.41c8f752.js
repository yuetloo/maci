"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1229],{6666:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var n=i(5893),a=i(1151);const o={title:"Latest MACI Audit",description:"In the summer of 2022, MACI v1 was audited by HashCloak. The audit covered both the zk-SNARK circuits and the Solidity smart contracts.",sidebar_label:"Latest Audit",sidebar_position:10},s="Security Audit 2022",r={id:"v1.x/audit",title:"Latest MACI Audit",description:"In the summer of 2022, MACI v1 was audited by HashCloak. The audit covered both the zk-SNARK circuits and the Solidity smart contracts.",source:"@site/docs/v1.x/audit.md",sourceDirName:"v1.x",slug:"/v1.x/audit",permalink:"/maci/docs/v1.x/audit",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/v1.x/audit.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Latest MACI Audit",description:"In the summer of 2022, MACI v1 was audited by HashCloak. The audit covered both the zk-SNARK circuits and the Solidity smart contracts.",sidebar_label:"Latest Audit",sidebar_position:10},sidebar:"docSidebar",previous:{title:"Command-line interface",permalink:"/maci/docs/v1.x/cli"},next:{title:"Minimum Anti-Collusion Infrastructure",permalink:"/maci/docs/v0.x/introduction"}},d={},c=[{value:"Data is not fully verified during a state update",id:"data-is-not-fully-verified-during-a-state-update",level:2},{value:"Token for top-up is a free resource",id:"token-for-top-up-is-a-free-resource",level:2},{value:"Integer overflow problem and improper bit length restriction",id:"integer-overflow-problem-and-improper-bit-length-restriction",level:2},{value:"MessageQueue in PollFactory is uninitialized",id:"messagequeue-in-pollfactory-is-uninitialized",level:2},{value:"Additional issues and improvements",id:"additional-issues-and-improvements",level:2}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"security-audit-2022",children:"Security Audit 2022"}),"\n",(0,n.jsx)(t.p,{children:"In the summer of 2022, MACI v1 was audited by HashCloak. The audit covered both the zk-SNARK circuits and the Solidity smart contracts."}),"\n",(0,n.jsx)(t.p,{children:"This audited revealed a number of high severity issues which have been remediated by the MACI development team. We will be looking at those in details in the following sections."}),"\n",(0,n.jsx)(t.h2,{id:"data-is-not-fully-verified-during-a-state-update",children:"Data is not fully verified during a state update"}),"\n",(0,n.jsx)(t.p,{children:"This issue could have allowed a malicious coordinator to change the MACI state arbitrarly, for instance by tampering with the voice credits and the voting public key of any user."}),"\n",(0,n.jsxs)(t.p,{children:["In more details, the ",(0,n.jsx)(t.code,{children:"processMessages.circom"})," circuit, did not fully verify that after a state update, the new state was the result of executing an arbitrary number of user messages on the previous state. ",(0,n.jsx)(t.code,{children:"topupStateLeaves"})," and ",(0,n.jsx)(t.code,{children:"topupStateLeavesPathElements"})," were never verified against the current state, and ",(0,n.jsx)(t.code,{children:"topupStateIndexes"})," and ",(0,n.jsx)(t.code,{children:"topupAmounts"})," were not verified against the message root."]}),"\n",(0,n.jsxs)(t.p,{children:["This was rectified with commit ",(0,n.jsx)(t.a,{href:"https://github.com/privacy-scaling-explorations/maci/pull/522/commits/6df6a4054da926b07f35c5befab4f1f8af33dcc6",children:"6df6a4054da926b07f35c5befab4f1f8af33dcc6"})]}),"\n",(0,n.jsx)(t.h2,{id:"token-for-top-up-is-a-free-resource",children:"Token for top-up is a free resource"}),"\n",(0,n.jsxs)(t.p,{children:["The provided ",(0,n.jsx)(t.code,{children:"TopupCredit.sol"})," contract implemented unprotected ",(0,n.jsx)(t.code,{children:"airdrop"})," and ",(0,n.jsx)(t.code,{children:"airdropTo"})," functions, which could have allowed anyone to receive unlimited voice credits. While this contract was provided as a template, the issue has been rectified by adding the ",(0,n.jsx)(t.code,{children:"onlyOwner"})," modifier to these two functions."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:'function airdropTo(address account, uint256 amount) public onlyOwner {\n    require(amount < MAXIMUM_AIRDROP_AMOUNT);\n    _mint(account, amount);\n}\n\nfunction airdrop(uint256 amount) public onlyOwner {\n    require(amount < MAXIMUM_AIRDROP_AMOUNT, "amount exceed maximum limit");\n    _mint(msg.sender, amount);\n}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"integer-overflow-problem-and-improper-bit-length-restriction",children:"Integer overflow problem and improper bit length restriction"}),"\n",(0,n.jsxs)(t.p,{children:["This issue within the ",(0,n.jsx)(t.code,{children:"float.circom"})," circuit could have resulted in a overflow on the ",(0,n.jsx)(t.code,{children:"IntegerDivision"})," template. This stemmed from the lack of validation of input size, as well as not preventing a division by zero. Furthemore, it was pointed out that using assert in circuits did not contribute to constraints verification, and could have been bypassed by a malicious coordinator."]}),"\n",(0,n.jsxs)(t.p,{children:["The issue was rectified with commit ",(0,n.jsx)(t.a,{href:"https://github.com/privacy-scaling-explorations/maci/pull/523/commits/efd4617724e956d2566062c6fe882e1d45cba7c4",children:"efd4617724e956d2566062c6fe882e1d45cba7c4"})]}),"\n",(0,n.jsx)(t.h2,{id:"messagequeue-in-pollfactory-is-uninitialized",children:"MessageQueue in PollFactory is uninitialized"}),"\n",(0,n.jsx)(t.p,{children:"MACI uses a message queue (a quinary merkle tree) to store all the messages to be processed for a single poll. When deploying a new poll, a corresponding message queue contract is deployed as well, however this was never initialized with a zero value."}),"\n",(0,n.jsx)(t.p,{children:"Should the queue never be initialized with the zero value, a malicious user could submit a message to initialize the queue with a value they know how to decrypt, which however would take a very long time to generate a proof for. This could result in a denial of service attack against the coordinator."}),"\n",(0,n.jsxs)(t.p,{children:["The code was fixed by enqueing a message containing the zero value ",(0,n.jsx)(t.code,{children:"NOTHING_UP_MY_SLEEVE"})," which is the result of:"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:'keccak256("Maci") % p'})}),"\n",(0,n.jsxs)(t.p,{children:["Transalted into code, an ",(0,n.jsx)(t.code,{children:"init"})," function was included in the Poll contract, with the following enqueing of the placeholder leaf:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"// init messageAq here by inserting placeholderLeaf\nuint256[2] memory dat;\ndat[0] = NOTHING_UP_MY_SLEEVE;\ndat[1] = 0;\n(Message memory _message, PubKey memory _padKey, uint256 placeholderLeaf) = padAndHashMessage(dat, 1); \nextContracts.messageAq.enqueue(placeholderLeaf);\n"})}),"\n",(0,n.jsx)(t.h2,{id:"additional-issues-and-improvements",children:"Additional issues and improvements"}),"\n",(0,n.jsx)(t.p,{children:"The rest of the issues were either low risk, informational or general optimizations."}),"\n",(0,n.jsxs)(t.p,{children:["As an example, there were certain functions which did not enforce the checks-effets-interaction pattern, which could potentially have led to reentrancy attacks. While most of these have been fully remediated, the ",(0,n.jsx)(t.code,{children:"deployPoll"})," function within MACI is not currently enfocing the pattern when deploying a new poll contract using the ",(0,n.jsx)(t.code,{children:"PollFactory"})," factory contract."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"function deployPoll(\n    uint256 _duration,\n    MaxValues memory _maxValues,\n    TreeDepths memory _treeDepths,\n    PubKey memory _coordinatorPubKey\n) public afterInit {\n    uint256 pollId = nextPollId;\n\n   [..snip]\n\n    Poll p = pollFactory.deploy(\n        _duration,\n        _maxValues,\n        _treeDepths,\n        batchSizes,\n        _coordinatorPubKey,\n        vkRegistry,\n        this,\n        topupCredit,\n        owner()\n    );\n\n    polls[pollId] = p;\n\n    emit DeployPoll(pollId, address(p), _coordinatorPubKey);\n}\n"})}),"\n",(0,n.jsxs)(t.p,{children:["As seen above, an external call is made, before updating the state with the new poll. The issue is tracked ",(0,n.jsx)(t.a,{href:"https://github.com/privacy-scaling-explorations/maci/pull/522#discussion_r981863147",children:"here"})," and only left open as the code does not enforce best practices, however it does not pose any immediate risk."]}),"\n",(0,n.jsxs)(t.p,{children:["The rest of the issues were succesffuly fixed and reflected in the v1.1.1. For the full report, please refer to the ",(0,n.jsx)(t.code,{children:"audit"})," folder inside the root of the repository."]})]})}function u(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,t,i)=>{i.d(t,{Z:()=>r,a:()=>s});var n=i(7294);const a={},o=n.createContext(a);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);