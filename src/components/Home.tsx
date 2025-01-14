import Navbar from  './NavBar';
import endpoints from '../endpoints/endpoints';
import { useState, useEffect, useRef} from 'react';
import Typed from 'typed.js';

function Home() {

  const [data, setData] = useState<{ name: String; roles: string[] } | null>(null)
  const typedElement = useRef<HTMLSpanElement>(null)
  const currentElement = useRef<Typed | null>(null)

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error Fetching Home Data: ', err));
  }, []);

  useEffect(() => {
    if(data && typedElement.current) {
      currentElement.current = new Typed(typedElement.current, {
        strings: data.roles,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 700,
        loop: true
      })
    }
    return () => {
      if(currentElement.current){
        currentElement.current.destroy()
      }
    };
  }, [data])

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='flex flex-col items-center justify-center h-screen w-screen text-center'>
        {data && (
          <>
          <h1 className='text-4x1 font-bold mb-4'>{data.name}</h1>
          <h2 className='text-2x1'>
            I am <span ref={typedElement} className='text-blue-500' />
          </h2>
          </>
        )}
      </div>
    </div>
  )
}
export default Home