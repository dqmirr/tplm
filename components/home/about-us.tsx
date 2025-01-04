"use client"

import { ChevronDown, LockIcon, ServerIcon, LucideShoppingBasket, FishIcon } from 'lucide-react'

const features = [
  {
    name: 'Lorem ipsum',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ChevronDown,
  },
  {
    name: 'Lorem Ipsum.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: FishIcon,
  },
  {
    name: 'Lorem Ipsum',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: LucideShoppingBasket,
  },
]

export default function AboutUs() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">Tentang Kami</h2>
              {/* <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                A better workflow
              </p> */}
              <p className="mt-6 text-lg/8 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum convallis orci a vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed congue, mi sed aliquet lobortis, nulla urna placerat tellus, id mollis dolor felis a lectus. In euismod a est posuere scelerisque. Cras porttitor ante ac quam consectetur, id vestibulum erat pulvinar. Integer non suscipit elit. Donec cursus odio arcu, eu volutpat ante lobortis vel.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://wciynsourbssugiegoor.supabase.co/storage/v1/object/public/tplm/carousel/IMG-20241223-WA0052.jpg"
            width={2432}
            height={1442}
            className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
