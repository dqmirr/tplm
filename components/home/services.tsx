import { Fish } from "lucide-react";

export default function Services (){
    return (
        <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Layanan yang kami tawarkan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Quality Inspection',
                description: 'All seafood is inspected for freshness and quality',
                icon: <Fish className="h-6 w-6 text-blue-500" />
              },
              {
                title: 'Vendor Support',
                description: 'Financial and technical support for local vendors',
                icon: <Fish className="h-6 w-6 text-blue-500" />
              },
              {
                title: 'Sustainability',
                description: 'Promoting sustainable fishing practices',
                icon: <Fish className="h-6 w-6 text-blue-500" />
              },
              {
                title: 'Education',
                description: 'Public workshops and training programs',
                icon: <Fish className="h-6 w-6 text-blue-500" />
              }
            ].map((service, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}