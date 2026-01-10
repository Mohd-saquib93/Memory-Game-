import React, { useEffect, useState } from 'react'

const getNums = ()=>{
  const list = [];
  for(let i=1; i<=8; i++){
    list.push(i);
    list.push(i);
  }
      return list;
}

const App = () => {
   
  const [nums,setNums] = useState(getNums());
  const [opened,setOpened] = useState([]);
  const [solvedList,setSolvedList] = useState([]);
  const [stage,setStage] = useState('init');
 
  console.log('solvedList',solvedList);
  console.log('nums',nums);
  const randomNums = ()=>{
    const copyNums =  [...nums];
    return copyNums.sort(()=> Math.random() - 0.5);
  }
  const handleStart = ()=>{
    setStage('start');
    setNums(randomNums());
    setSolvedList([]);
  }

  const handleClick = (num,index)=>{
    if(opened.length === 2)
      return
    setOpened((prev)=> [...prev,index]);

  }
  console.log('opened',opened);
  // console.log('nums',nums);

  useEffect (()=>{
    if(opened.length === 2){
      setTimeout(()=>{
        const id1 = opened[0];
        const id2 = opened[1];
        if(nums[id1] === nums[id2]){ //if equal then remove the cards
          setSolvedList((prev => [...prev,nums[id1]]));
        }
        setOpened([]);

      },1000)
    }

  },[opened])

  useEffect(()=>{
    if(solvedList.length === 8){
      setStage('win');
    }

  },[solvedList])

  const getClassName = (num,index)=>{
    if(solvedList.includes(num)){
      return 'remove';
    }else if(opened.includes(index)){
      return 'show';
    }else return 'hide';
  }
  return (
    <div className='App mt-10 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl '>Memory Game</h1>
      {stage === 'init' && 
      <button 
      onClick={handleStart}
      className='border-1 mt-5 rounded-[8px] w-[100px] h-[30px] p-1'>Play Game</button>}
      {
        stage === 'start' && 
        <div className='game flex justify-centeri items-center'>
          <div className='cards grid grid-cols-4 gap-x-4 '>
            {
              nums.map((num,i)=>(
                <div 
                key={i}
                className={`card ${getClassName(num,i)} bg-green-300 p-8 font-semibold mt-10 text-2xl `  }
                onClick={()=>handleClick(num,i)}
                >{num}</div>
              ))
            }
          </div>
        </div>
      }
      {
        stage === 'win' &&
        <div className='flex justify-between items-center flex-col'>
          <h1 className='font-bold text-4xl mt-10'>You Won The Game!</h1>
          <button onClick={handleStart}
          className='border-1 p-3 bg-purple-900 text-white rounded-[10px] text-xl mt-10'
          > Play Again </button>
        </div>
      }
    </div>
  )
}

export default App