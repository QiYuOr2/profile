import dayjs from "dayjs";
import { PROFILE } from "../../constants";

export function Skills() {
  const diff = dayjs().diff(dayjs(PROFILE.StartTime), 'year');

  const skillIcons = ['i-ri:html5-line', 'i-ri:css3-line', 'i-proicons:javascript', 'i-proicons:typescript', 'i-ri:reactjs-line', 'i-ri:vuejs-line', 'i-ri:nodejs-line', 'i-ri:tailwind-css-line', 'i-ri:mini-program-line', 'i-proicons:webpack', 'i-ri:npmjs-line', 'i-proicons:visual-studio-code', 'i-ri:chrome-line', 'i-ri:openai-fill', 'i-proicons:linux', 'i-ri:apple-line', 'i-ri:windows-line', 'i-ri:github-line',];

  return (
    <div className="box-border p-8 h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute right--5 bottom--8 text-8em font-bold color-transparent text-stroke-6 text-stroke-hex-aaa op10">Skills</div>
      <div className="text-xl font-bold">前端从业 {diff} 年</div>
      <div className="flex w-3/4 flex-wrap gap-2 text-xl">
        {skillIcons.map(icon => <i key={icon} className={`${icon} inline-block`}></i>)}
      </div>
    </div>
  );
}
