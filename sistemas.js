const CantVariables=document.getElementById('Variables');
const tabla=document.getElementById('tabla');
const generar=document.getElementById('generar');
const CantEcuacionses=document.getElementById('Ecuaciones');
const sol=document.getElementById('resolver');
const back=document.getElementById('back');
  const ecuacion=document.getElementById('sms');
let MatrizBack=[];
function determinante(m){
    let m1=copiarMatriz(m);
  let  n=m1.length;
    if(n==1)return m1[0][0];
    if(n==2)return (m1[0][0]*m1[1][1])-(m1[0][1]*m1[1][0]);
    let det=0;
    for(let columna=0;columna<n;columna++){
let signo =  Math.pow(-1,columna);
let valor=m1[0][columna];
let m2=[];
for(let f=1;f<n;f++){
let fila=[];
for(let c=0;c<n;c++){
    if(c!=columna){
        fila.push(m1[f][c]);
    }
    
}
m2.push(fila);
}
det+=signo*valor*determinante(m2);
}
return det;
    }
function backToMatriz(){
  ecuacion.innerHTML="";
    imprimir(MatrizBack);
}
function imprimir(matriz,resuelto=false){
let m=copiarMatriz(matriz);
 let filas=matriz.length;
 let columnas=matriz[0].length;
for(let i=0;i<filas;i++){
    for(let j=0;j<columnas;j++){
        document.getElementById(`${i}_${j}`).value=`${decimalAfraccion(m[i][j])}`;
                if(resuelto){
                    document.getElementById(`${i}_${j}`).classList.add('resultado');
                }else{
                      document.getElementById(`${i}_${j}`).classList.remove('resultado');
                }
        
    }
}
}
function decimalAfraccion(valor, precision = 10000) {
    if (valor === 0) return "0";
    let signo = valor < 0 ? "-" : "";
    valor = Math.abs(valor);
    if (Number.isInteger(valor)) return signo + valor;
    let numerador = 1;
    let denominador = 1;
    let mejorError = Infinity;
    let mejorNum = 1;
    let mejorDen = 1;
    for (let d = 1; d <= precision; d++) {
        let n = Math.round(valor * d);
        let error = Math.abs(valor - (n / d));
        if (error < mejorError) {
            mejorError = error;
            mejorNum = n;
            mejorDen = d;
            if (error < 1e-9) break;
        }
    }
    const mcd = (a, b) => b === 0 ? a : mcd(b, a % b);
    const divisor = mcd(mejorNum, mejorDen);
    numerador = mejorNum / divisor;
    denominador = mejorDen / divisor;
    if (denominador === 1) return signo + numerador;
    return `${signo}${numerador}/${denominador}`;
}
function copiarMatriz(m) {
    return m.map(fila => [...fila]);
}
function EliminarValor(matriz, fp, fd, cp) {
 let columnas=matriz[0].length;
    const valorPivote = matriz[fp][cp];
    const valorAEliminar = matriz[fd][cp];
   
    if (Math.abs(valorAEliminar) ==0) return matriz;
    if (Math.abs(valorPivote) ==0) {
        throw new Error(`Pivote cero en posición [${fp}][${cp}]`);
    }
    const factor = valorAEliminar / valorPivote;
    for (let j = 0; j < columnas; j++) {
        matriz[fd][j] -= (matriz[fp][j] * factor);
       
    }
    
    return matriz;
}
function escalarM(m) {

    let matriz=copiarMatriz(m);
    let filas=m.length;
 let columnas=m[0].length-1;
 let min=Math.min(filas,columnas);

    for (let k = 0; k < min; k++) {
    
        if (matriz[k][k] === 0) {
            for (let i = k + 1; i < filas; i++) {
                if (matriz[i][k] !== 0) {
                    let temp = matriz[k];
                    matriz[k] = matriz[i];
                    matriz[i] = temp;
                    break;
                }
            }
        }
        for (let i = k + 1; i < filas; i++) {
            matriz = EliminarValor(matriz, k, i, k);
        }
    }
   return matriz;
}
function generarTabla(filas,columnas){
filas=parseInt(filas);
columnas=parseInt(columnas)+1;
if(isNaN(filas)||isNaN(columnas)||filas==1&&columnas==1){
    tabla.innerHTML='';
    return;
}
const matriz=document.createElement('table');
matriz.className="matriz";
for(let i=0;i<filas;i++){
    const fila=document.createElement('tr');
    for(let j=0;j<columnas;j++){
const celda=document.createElement('td');
const input=document.createElement('input');
input.type='text';
input.id=`${i}_${j}`;
celda.appendChild(input);
const V=document.createElement('span');
if(j==columnas-1){
V.textContent="=";
fila.appendChild(V);
}

if(j<columnas-1){
V.innerHTML=`X<sub>${j+1}</sub>`;
celda.appendChild(V);
}
fila.appendChild(celda);
    }
    matriz.appendChild(fila);
}
tabla.innerHTML='';
tabla.appendChild(matriz);
}
function getMatrizDOM(){
      let m = [];
let filas=parseInt(CantEcuacionses.value);
 let columnas=parseInt(CantVariables.value)+1;
    for (let i = 0; i < filas; i++) {
        m[i] = [];
        for (let j = 0; j < columnas; j++) {
            m[i][j] = Number(document.getElementById(`${i}_${j}`).value) || 0;
        }
    }
    
    return m;
}
generar.onclick = () => {
        ecuacion.innerHTML="";
        MatrizBack=[];
    generarTabla(CantEcuacionses.value,CantVariables.value);
}
function generarEcuacion(m){
    let matriz=copiarMatriz(m);
const columnas=m[0].length;
const fila=m.length;

let sistema=[];
for(let i=0;i<fila;i++){
    let ecuacion=[];
    for(let j=0;j<columnas;j++){
        if(matriz[i][j]==0){continue;}
        
        let input="";
        if(parseInt(decimalAfraccion(matriz[i][j]))!=0){
        if(j<columnas-1){
            let positive="";
            if(j>0)positive="+";
         input=(`${positive}(${decimalAfraccion(matriz[i][j])})X<sub>${j+1}</sub>`);
        }else if(j==columnas-1){
 input=(`=${decimalAfraccion(matriz[i][j])}`);
        }
        ecuacion+=input;
    }
}
    sistema.push(ecuacion);
}
return sistema;
}
function cramer(m,det){

let filas=m.length;
let columnas=m[0].length;
let soluciones=[];
let actual=0;
while(actual<columnas-1){
 let matriz=copiarMatriz(m);
    for(let i=0;i<filas;i++){
     matriz[i][actual]=matriz[i][columnas-1];
    }
soluciones.push(determinante(matriz)/det);
actual++;
}
return soluciones;
}
sol.onclick=()=>{
 if(MatrizBack.length==0) MatrizBack=getMatrizDOM();
 const m = copiarMatriz(MatrizBack);
 let  det=determinante(m);
  if(det==0|| parseInt(CantEcuacionses.value)!=parseInt(CantVariables.value)){
    const mEscalonada = escalarM(m);
    imprimir(mEscalonada,true);
    ecuacion.innerHTML=generarEcuacion(mEscalonada).join('<br>');
 }else{
const sol=cramer(m,det);
let resultados="";
for(let i=0;i<sol.length;i++){
    resultados+=`X<sub>${i+1}</sub>=${decimalAfraccion(sol[i])}<br>`;
}
ecuacion.innerHTML=resultados;

}
 }

back.onclick=()=>{
    backToMatriz();
    
}