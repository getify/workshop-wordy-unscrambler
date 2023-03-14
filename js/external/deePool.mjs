/*! deePool: deePool.mjs
    v3.0.0 (c) 2021 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
const EMPTY_SLOT=Object.freeze(Object.create(null));export default{create:create};export{create};function create(e=(()=>({}))){var n=[],t=null;return{use:function use(){null!=t&&t!=n.length||grow(n.length||5);var e=n[t];return n[t++]=EMPTY_SLOT,e},recycle:function recycle(e){null==t||-1==t?n[n.length]=e:n[--t]=e},grow:grow,size:function size(){return n.length}};function grow(r=n.length){if(r>0&&null==t&&(t=0),r>0){var l=n.length;n.length+=Number(r);for(var u=l;u<n.length;u++)n[u]=e()}return n.length}}
