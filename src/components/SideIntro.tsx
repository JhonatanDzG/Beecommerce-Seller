// src/components/RegisterIntro.tsx

import Image from "next/image";
import Logo from "../../public/bee.png";

export default function SideIntro() {
    return (
      <aside className="w-full md:w-1/2 bg-yellow-100 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-sm text-center">
          <Image src={Logo} alt="Logo" className="w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">BeeCommerce</h2>
          <p className="text-gray-700">
            Vende tus productos apícolas de forma rápida, segura y sin complicaciones.
          </p>
        </div>
      </aside>
    );
  }
  
