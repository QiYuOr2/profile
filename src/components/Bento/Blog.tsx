export function Blog() {
  return (
    <a href='//blog.qiyuor2.me' target="_blank" className='block text-black decoration-none py-2.5 px-3.5'>
      <div className='font-bold text-lg'>个人博客</div>
      <div className='flex items-center text-sm rounded-full bg-zinc-100 py-1 pl-2 pr-1.5 absolute bottom-3 right-4 hover:bg-zinc-200 transition-colors duration-200'>
        <div>去看看</div>
        <i className="i-mdi:arrow-top-right-thick"></i>
      </div>
    </a>
  );
}
