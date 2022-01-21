import { ArrowRight, GitHub, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import Link from 'next/Link';
import Layout from '../components/Layout';
import Image from 'next/image'
export default function Home({ pokemon }) {
    return (
        <Layout title="Pokedex">
            <div  className='m-8'>
            <Image height='70' width='200' src='/img/logo-pokedex.png'  alt='pokedex' />
            </div>
            
            <div className='flex justify-center items-center mx-auto my-5'>
              <a href="https://twitter.com/RutikErole"><Twitter className='mr-10'/></a>
              <a href="https://www.instagram.com/rutik__erole/"><Instagram className='mr-10' /></a>
              <a href="https://www.linkedin.com/in/rutik-erole-842134205/"><LinkedIn className='mr-10' /></a>
              <a href="https://github.com/rutikerole"><GitHub /></a>
            </div>
           
            <ul>
                {pokemon.map((pokeman, index) => (
                    <div key={index}>
                        <Link href={`/pokemon?id=${index + 1}`}>
                            <a className=" font-bold m-4 mx-auto min-w-min w-1/2 shadow-xl hover:shadow-2xl hover:text-black capitalize flex items-center text-3xl text-white bg-white-300  rounded-md">
                                <span className="mx-10 text-3xl text-red-500 font-bold">{index + 1}.</span>
                                {pokeman.name}
                                <div className="ml-auto sm:w-14 md:w-24 lg:w-42 xl:w-44"><Image height='150' width='160' src={pokeman.image} alt={pokeman.name} /> </div>
                                <ArrowRight/>
                            </a>
                        </Link>
                    </div>
                ))}
            </ul>
        </Layout>
    );
}

export async function getStaticProps(context) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const { results } = await res.json();
        const pokemon = results.map((pokeman, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);

            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return { ...pokeman, image };
        });
        return {
            props: { pokemon },
        };
    } catch (err) {
        console.error(err);
    }
}
