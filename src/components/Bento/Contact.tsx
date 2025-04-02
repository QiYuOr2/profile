export function Contact() {
  const contacts = [
    { label: 'Email', link: 'mailto:qiyuor2@gmail.com', icon: 'i-mdi:email', color: '#31b5f7' },
    { label: 'Bilibili', link: 'https://space.bilibili.com/10980643', icon: 'i-ri:bilibili-fill', color: '#fa67aa' },
    { label: 'GitHub', link: 'https://github.com/QiYuOr2', icon: 'i-mdi:github', color: '##4b4b4b' },
  ];

  return (
    <div className="box-border flex flex-col items-center h-full justify-between p-5">
      {contacts.map(item => (
        <a className="box-border flex items-center w-full px-3 py-2 rounded-full gap-2 bg-zinc-100 hover:bg-zinc-50 transition-colors duration-200 block no-underline text-current" href={item.link} target="__blank" style={{ color: item.color }} key={item.icon}>
          <span className={`${item.icon} block text-md w-5 h-5`}></span>
          <span className="text-black">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
