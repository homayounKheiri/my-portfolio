import projectsData from '@/app/data/ProjectsData';
import CustomImage from '../CustomImage/CustomImage';
import { GithubIcon, GlobeIcon, LinkedinIcon, PhoneIcon } from 'lucide-react';
import background from '@/app/assets/images/bg_gr_light.png';
import { ForwardedRef, forwardRef } from 'react';
import Link from 'next/link';

function PrintPage({}, ref: ForwardedRef<HTMLDivElement | null>) {
  /* -------------------------------------------------------------------------- */
  /*                                    Const                                   */
  /* -------------------------------------------------------------------------- */

  const socials = [
    {
      id: 0,
      link: 'https://homayoundev.ir',
      text: 'homayoundev.ir',
      icon: <GlobeIcon className="size-4" />,
    },
    {
      id: 1,
      link: 'github.com/homayoun_kheiri',
      text: 'github.com/homayoun_kheiri',
      icon: <GithubIcon className="size-4" />,
    },
    {
      id: 2,
      link: 'https://linkedin.com/in/homayoun-kheiri',
      text: 'linkedin.com/homayoun-kheiri',
      icon: <LinkedinIcon className="size-4" />,
    },
    {
      id: 3,
      link: 'tel:09130654757',
      text: '09130654757',
      icon: <PhoneIcon className="size-4" />,
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className="flex flex-col w-full max-w-[1000px]"
      id="print-page"
      ref={ref}
    >
      <div
        className="bg-gray-700 w-full "
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
        }}
      >
        <div className="bg-linear-90 from-gray-700 from-40% to-1000% to-transparent p-8 pt-6 gap-4 flex flex-col">
          <h1 className="text-[30px] bg-linear-150 from-white leading-normal to-gray-700 bg-clip-text text-transparent font-semibold">
            Homayoun Kheiri
          </h1>
          <hr className="w-full border-gray-500" />
          <h4 className="text-gray-400 text-[12px]">Web Developper</h4>
        </div>
      </div>

      <div className="flex items-center bg-gray-300 w-full">
        <div className="bg-gray-400 w-2 h-12 mr-6" />

        {socials.map((item, idx) => (
          <div className="flex items-center py-3" key={item.id}>
            <span className="text-gray-400 mr-2">{item.icon}</span>
            <Link href={item.link} className="text-black text-xs">
              {item.text}
            </Link>
            {idx < socials.length - 1 && (
              <div className="h-6 w-[1px] bg-gray-400 mx-3" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {projectsData.map(
          ({ description, images, name, technologies: skills }, idx) => (
            <div
              className="flex flex-col gap-6 border-b border-gray-300 py-12 px-10 w-full"
              key={idx}
            >
              <h2 className="text-xl font-semibold">{name}</h2>

              <div className="grid grid-cols-3 gap-4">
                {images.map((image, imgIdx) => (
                  <CustomImage
                    key={imgIdx}
                    unoptimized
                    loading="eager"
                    src={image}
                    alt={`${name} image ${idx + 1}`}
                    width={400}
                    height={500}
                    parentClassName="aspect-[4/3]"
                    className="object-cover pointer-events-none rounded-lg"
                  />
                ))}
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-600 text-primary-foreground rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default forwardRef(PrintPage);
