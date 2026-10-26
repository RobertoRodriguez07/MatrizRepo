const aFilas=document.getElementById('aFilas');
const aColumnas=document.getElementById('aColumnas');
const bFilas=document.getElementById('bFilas');
const bColumnas=document.getElementById('bColumnas');
const generar=document.getElementById('generar');
const solve=document.getElementById('multiplicar');
const tabla1=document.getElementById('tabla1');
const tabla2=document.getElementById('tabla2');
const tabla3=document.getElementById('tabla3');

//Funciones
function getMatriz(f,c,tabla){
    f=parseInt(f);
    c=parseInt(c);
    let m=[];

    for(let i=0;i<f;i++){
        m[i]=[];
        for(let j=0;j<c;j++){
            
            m[i][j]=Number(tabla.querySelector(`[id="${i}_${j}"]`).value);
        }
    }
return m;
}
function imprimir(matriz){
const f=matriz.length;
const c=matriz[0].length;
for(let i=0;i<f;i++){
    for(let j=0;j<c;j++){
tabla3.querySelector(`[id="${i}_${j}"]`).value=matriz[i][j];
    }
}
}
function multiplicar(matrizA,matrizB){
let matrizC= [];
const filasA=matrizA.length;
const columnasA=matrizA[0].length;
const columnasB=matrizB[0].length;
for(let i = 0;i<filasA;i++){
    matrizC[i]=[];
    for(let j=0;j<columnasB;j++){
        matrizC[i][j]=0;
        for(let k=0;k<columnasA;k++){
       matrizC[i][j]+=matrizA[i][k]*matrizB[k][j];

        }
    }
}
return matrizC;
}
function generarTabla(filas,columnas,tabla){
document.querySelectorAll('.ocult').forEach(elemento => {
 elemento.classList.remove('ocult');
});
document.getElementById('tablas').classList.remove('ocult');
    filas=parseInt(filas);
columnas=parseInt(columnas);
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
fila.appendChild(celda);
    }
    matriz.appendChild(fila);
}
tabla.innerHTML='';
tabla.appendChild(matriz);
}
//Llamadas
generar.onclick=()=>{
if(aFilas.value.length>0&&bFilas.value.length>0&&aColumnas.value.length>0&&bColumnas.value.length>0&&aColumnas.value==bFilas.value){
generarTabla(aFilas.value,aColumnas.value,tabla1);
generarTabla(bFilas.value,bColumnas.value,tabla2);
generarTabla(aFilas.value,bColumnas.value,tabla3);
}else{
    alert("Parametros no validos");
}
}
solve.onclick=()=>{

let matrizA=getMatriz(aFilas.value,aColumnas.value,tabla1);
let matrizB=getMatriz(bFilas.value,bColumnas.value,tabla2);
let matrizC=multiplicar(matrizA,matrizB);
imprimir(matrizC);

}



