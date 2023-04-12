import React from 'react';
import Image from 'next/image'

function IconClear({onClick=()=>{}, className='icon_clear'}) {
  return (
    <div onClick={onClick} className={className}>
      <Image src={'/icon/clear.svg'} width={24} height={24} alt={'icon_clear'}/>
    </div>
  );
}

export default IconClear;