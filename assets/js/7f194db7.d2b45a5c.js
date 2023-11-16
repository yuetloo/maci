"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4819],{3645:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var s=r(5893),n=r(1151);const i={},o="The quadratic vote tallying circuit",d={id:"v0.x/quadratic_vote_tallying_circuit",title:"The quadratic vote tallying circuit",description:"- Inputs",source:"@site/docs/v0.x/quadratic_vote_tallying_circuit.md",sourceDirName:"v0.x",slug:"/v0.x/quadratic_vote_tallying_circuit",permalink:"/maci/docs/v0.x/quadratic_vote_tallying_circuit",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/v0.x/quadratic_vote_tallying_circuit.md",tags:[],version:"current",frontMatter:{},sidebar:"docSidebar",previous:{title:"The state root transition proof circuit",permalink:"/maci/docs/v0.x/state_root_transition_circuit"},next:{title:"FAQ",permalink:"/maci/docs/v0.x/faq"}},c={},a=[{value:"Inputs",id:"inputs",level:2},{value:"Circuit pseudocode",id:"circuit-pseudocode",level:2},{value:"Circuit failure modes",id:"circuit-failure-modes",level:2}];function h(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"the-quadratic-vote-tallying-circuit",children:"The quadratic vote tallying circuit"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#inputs",children:"Inputs"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#circuit-pseudocode",children:"Circuit pseudocode"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#circuit-failure-modes",children:"Circuit failure modes"})}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Quadratic voting is one of many types of vote tallying mechanisms. We chose it for the first version of MACI due to the high amount of interest that the community has shown for it."}),"\n",(0,s.jsxs)(t.p,{children:["Quadratic voting allows users to express the strength of their preferences when they vote for options. Since users are allocated a limited number of ",(0,s.jsx)(t.em,{children:"voice credits"}),", and the number of tallied votes per option is the square root of the number of voice credits spent on said option, quadratic voting ",(0,s.jsx)(t.a,{href:"https://www.vitalik.ca/general/2019/12/07/quadratic.html",children:"over-privileges neither concentrated nor diffuse interests"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"For instance, if a user has 99 voice credits, they may spend them this way (each row represents a command):"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Option"}),(0,s.jsx)(t.th,{children:"Voice credits spent"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"A"}),(0,s.jsx)(t.td,{children:"1"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"A"}),(0,s.jsx)(t.td,{children:"9"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"B"}),(0,s.jsx)(t.td,{children:"25"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"C"}),(0,s.jsx)(t.td,{children:"64"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:"The outcome is as such:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Option"}),(0,s.jsx)(t.th,{children:"Tallied votes"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"A"}),(0,s.jsx)(t.td,{children:"3.16"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"B"}),(0,s.jsx)(t.td,{children:"5"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"C"}),(0,s.jsx)(t.td,{children:"8"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:"Even though the user has a disproportionate preference for option C (64 voice credits), their impact on the tallied vote (8 votes) is merely the square root of the voice credits they have spent. This prevents them from having an outsized influence on the results simply by virtue of their willingness to spend as many voice credits on that option as they had."}),"\n",(0,s.jsx)(t.p,{children:"Additionally, we consider that votes are cumulative. This means that the user spent 10 voice credits on option A."}),"\n",(0,s.jsxs)(t.p,{children:["The MACI contract's ",(0,s.jsx)(t.code,{children:"quadraticVoteTally()"})," function should verify a proof created using this circuit to compute the results of tallying a set of state leaves. This also proves that these state leaves have an intermediate root ",(0,s.jsx)(t.code,{children:"A"}),", as well that ",(0,s.jsx)(t.code,{children:"A"})," is part of the tree with final state root ",(0,s.jsx)(t.code,{children:"R"}),". This allows the coordinator to prove the final tally in batches. The function keeps track of the index of each intermediate root to ensure that they are processed consecutively."]}),"\n",(0,s.jsx)(t.h2,{id:"inputs",children:"Inputs"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Pseudocode name"}),(0,s.jsx)(t.th,{children:"zk-SNARK input type"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{children:"Set by"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"fullStateRoot"})}),(0,s.jsx)(t.td,{children:"Public"}),(0,s.jsx)(t.td,{children:"The final Merkle root of the state tree"}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"fullStateTreeDepth"})}),(0,s.jsx)(t.td,{children:"Hardcoded"}),(0,s.jsx)(t.td,{children:"The depth of the state tree"}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"intermediateStateTreeDepth"})}),(0,s.jsx)(t.td,{children:"Hardcoded"}),(0,s.jsx)(t.td,{children:"The depth of the intermediate state tree"}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"intermediateStateRoot"})}),(0,s.jsx)(t.td,{children:"Public"}),(0,s.jsx)(t.td,{children:"The intermediate Merkle root generated by the given state leaves"}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"intermediatePathElements[k]"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsxs)(t.td,{children:["The Merkle path elements from ",(0,s.jsx)(t.code,{children:"intermediateStateRoot"})," to ",(0,s.jsx)(t.code,{children:"stateRoot"}),"."]}),(0,s.jsx)(t.td,{children:"Coordinator"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"intermediatePathIndex"})}),(0,s.jsx)(t.td,{children:"Public"}),(0,s.jsxs)(t.td,{children:["The Merkle path index from ",(0,s.jsx)(t.code,{children:"intermediateStateRoot"})," to ",(0,s.jsx)(t.code,{children:"stateRoot"}),"."]}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"currentResults[n]"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsx)(t.td,{children:"The vote tally of all prior batches of state leaves"}),(0,s.jsx)(t.td,{children:"Coordinator"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"currentResultsSalt"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsx)(t.td,{children:"A random value to hash with the vote tally for state leaves up to the current batch"}),(0,s.jsx)(t.td,{children:"Coordinator"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"currentResultsCommitment"})}),(0,s.jsx)(t.td,{children:"Public"}),(0,s.jsxs)(t.td,{children:["The salted commitment of the values in ",(0,s.jsx)(t.code,{children:"currentResults"})]}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"newResultsCommitment"})}),(0,s.jsx)(t.td,{children:"Public"}),(0,s.jsxs)(t.td,{children:["The salted commitment of the vote tally for this batch of leaves plus the vote tally from ",(0,s.jsx)(t.code,{children:"currentResults"})]}),(0,s.jsx)(t.td,{children:"Contract"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"salt"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsx)(t.td,{children:"A random value to hash with the culmulate vote tally for this batch of state leaves"}),(0,s.jsx)(t.td,{children:"Coordinator"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"stateLeaves[m][p]"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsx)(t.td,{children:"The batch of leaves of the state tree to tally."}),(0,s.jsx)(t.td,{children:"Coordinator"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"voteLeaves[m][n]"})}),(0,s.jsx)(t.td,{children:"Private"}),(0,s.jsx)(t.td,{children:"The vote leaves for each user in this batch of state leaves."}),(0,s.jsx)(t.td,{children:"Coordinator"})]})]})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"n"})," is the number of options in ",(0,s.jsx)(t.code,{children:"voteOptionTree"}),".\n",(0,s.jsx)(t.code,{children:"m"})," is the number of state leaves in this batch.\n",(0,s.jsx)(t.code,{children:"k"})," is ",(0,s.jsx)(t.code,{children:"fullStateTreeDepth - intermediateStateTreeDepth"}),"\n",(0,s.jsx)(t.code,{children:"p"})," is the message length"]}),"\n",(0,s.jsx)(t.p,{children:"A result commitment is the hash of a Merkle root of all the vote leaves, and a salt. For instance:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-javascript",children:"root = genTree(results)\nhash(root, salt)\n"})}),"\n",(0,s.jsx)(t.h2,{id:"circuit-pseudocode",children:"Circuit pseudocode"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-javascript",children:"// Alice votes for party A with 16 credits\n// Bob votes for party A with 9 credits\n\n// Party A gets 7 tallied votes. NOT 5 votes.\n\n// Ensure via a constraint that the intermediate root is the \n// correct Merkle root of the stateLeaves passed into this \n// snark\nassert(intermediateStateRoot == genTree(stateLeaves))\n\n// Ensure via a constraint that the intermediate root is part of the full state tree\nvar x = generateMerkleRoot(\n    intermediatePathElements,\n    intermediatePathIndex,\n    intermediateRoot\n)\n\nassert(x == stateRoot)\n\n// This variable stores the sum of the square roots of each \n// user's voice credits per option.\nvar computedResults = currentResults\n\nvar start = 1\nif intermediatePathIndex > 0:\n    start = 0\n\n// For each user\nfor i as start to m: // we ignore leaf 0 on purpose\n    \n    // Ensure via a constraint that the voteLeaves for this \n    // user is correct (such that when each vote leaf is \n    // inserted into an MT, the Merkle root matches\n    // the `voteOptionTreeRoot` field of the state leaf)\n\n    var computedVoteOptionTreeRoot = genTree(voteLeaves[i])\n    assert(computedVoteOptionTreeRoot == stateLeaves[i].voteOptionTreeRoot)\n\n    // Calculate the sum of votes for each option\n    for j as 0 to n.\n        // This adds to the subtotal from previous batches\n        // of state leaves\n        computedResults[j] += voteLeaves[i][j]\n        \n        \n// Ensure via a constraint that the commitment to the current results is\n// correct\n\nassert(\n    hash(genTree(currentResults), currentResultsSalt) == \n    currentResultsCommitment\n)\n\n// Ensure via a constraint that the final result\n// is correct\nassert(\n    hash(genTree(computedResults), salt) == \n    newResultsCommitment\n)\n"})}),"\n",(0,s.jsxs)(t.p,{children:["where ",(0,s.jsx)(t.code,{children:"genTree"})," is pseudocode for a circuit which computes a Merkle root from a list of leaves."]}),"\n",(0,s.jsx)(t.h2,{id:"circuit-failure-modes",children:"Circuit failure modes"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Condition"}),(0,s.jsx)(t.th,{children:"Outcome"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Invalid state leaves and/or intermediate state root"}),(0,s.jsx)(t.td,{children:"No such proof can be generated"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Invalid vote option leaves"}),(0,s.jsx)(t.td,{children:"No such proof can be generated"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Invalid Merkle path to the full state root from the intermediate state root for the batch of votes"}),(0,s.jsx)(t.td,{children:"No such proof can be generated"})]})]})]})]})}function l(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>d,a:()=>o});var s=r(7294);const n={},i=s.createContext(n);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);