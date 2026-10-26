const pedirMatriz=document.getElementById('matrizSize');
const tabla=document.getElementById('tabla');
const generar=document.getElementById('generar');
const escalonarBtn=document.getElementById('scal');
const hallarDeterminante=document.getElementById('determinante');
const hallarInversa=document.getElementById('inv');
const back=document.getElementById('back');
//  FUNCIONES
let MatrizBack=[];
function backToMatriz(){
    imprimir(MatrizBack);
}
function imprimir(matriz,resuelto=false){
let m=copiarMatriz(matriz);
let n=m.length;
for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
        
        document.getElementById(`${i}_${j}`).value=decimalAfraccion(m[i][j]);
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
function inversa(matriz){
    let m=copiarMatriz(matriz);
    const n=m.length;
    console.log(`Tamano dea matris${n}`);
    const d=determinante(m);
      let resultado = [];
    for (let i = 0; i < n; i++) {
        resultado[i] = []; 
    }

     for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
               let m2=[];
            for(let k=0;k<n;k++){
                if(k==i){continue;}
                let fila=[];
                for(let l=0;l<n;l++){
                if(l==j){continue;}
                fila.push(m[k][l]);                       
                }
              m2.push(fila);
     }
     
    resultado[j][i]=(Math.pow(-1,i+j)*determinante(m2))/d;
    }
}
    imprimir(resultado,true);
}
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
function EliminarValor(matriz, fp, fd, cp) {
    const n = matriz.length;
    const valorPivote = matriz[fp][cp];
    const valorAEliminar = matriz[fd][cp];
   
    if (Math.abs(valorAEliminar) ==0) return matriz;
    if (Math.abs(valorPivote) ==0) {
        throw new Error(`Pivote cero en posición [${fp}][${cp}]`);
    }
    const factor = valorAEliminar / valorPivote;
    for (let j = 0; j < n; j++) {
        matriz[fd][j] -= (matriz[fp][j] * factor);
       
    }
    
    return matriz;
}
function escalarM(m) {
    let matriz=copiarMatriz(m);

    const size = m.length;
    let arriba=false;
    for (let k = 0; k < size - 1; k++) {
    
        if (matriz[k][k] === 0) {
            for (let i = k + 1; i < size; i++) {
                if (matriz[i][k] !== 0) {
                    let temp = matriz[k];
                    matriz[k] = matriz[i];
                    matriz[i] = temp;
                    break;
                }
            }
        }
        for (let i = k + 1; i < size; i++) {
            matriz = EliminarValor(matriz, k, i, k);
        }
            
    }
   return matriz;
}
function generarTabla(n){
    MatrizBack=[];
n=parseInt(n);
if(isNaN(n)||n==1){
    tabla.innerHTML='';
    return;
}
if(n>10){n=10;alert("Maximo n=10");pedirMatriz.value=10;}

const matriz=document.createElement('table');
matriz.className="matriz";
for(let i=0;i<n;i++){
    const fila=document.createElement('tr');
    for(let j=0;j<n;j++){
const celda=document.createElement('td');
const input=document.createElement('input');
input.type='text';
input.id=`${i}_${j}`;
celda.appendChild(input);
fila.appendChild(celda);
    }
    matriz.appendChild(fila);
}
tabla.innerHTML='';
tabla.appendChild(matriz);



}
function getMatrizDOM(){
      let m = [];
n=parseInt(pedirMatriz.value);
    for (let i = 0; i < n; i++) {
        m[i] = [];
        for (let j = 0; j < n; j++) {
            m[i][j] = Number(document.getElementById(`${i}_${j}`).value) || 0;
        }
    }
    return m;
}
//LLAMADAS
back.onclick=()=>{
    backToMatriz();
    
}
hallarInversa.onclick = () => {
   if(MatrizBack.length==0) MatrizBack=getMatrizDOM();
    const m = copiarMatriz(MatrizBack);
    inversa(m);
};
hallarDeterminante.onclick = () => {
  if(MatrizBack.length==0) MatrizBack=getMatrizDOM();
    const m = copiarMatriz(MatrizBack);
    const det = determinante(m);
    alert("Determinante: " + decimalAfraccion(det));
};
escalonarBtn.onclick = () => {
  if(MatrizBack.length==0) MatrizBack=getMatrizDOM();
    const m = copiarMatriz(MatrizBack);
    const mEscalonada = escalarM(m);
    imprimir(mEscalonada,true);
};
generar.onclick = () => {
      
    generarTabla(pedirMatriz.value);
}
pedirMatriz.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        generarTabla(pedirMatriz.value);
    }
});