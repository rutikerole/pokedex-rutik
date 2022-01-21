import React from 'react';
import Layout from '../components/Layout';
import { GitHub, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import Link from 'next/Link';
import Image from 'next/image'

export default function pokemon({ pokeman }) {
    return (
        <Layout title={pokeman.name}>
          <div  className='m-8'>
            <Image height='70' width='200' src='/img/logo-pokedex.png'  alt='pokedex' />
            </div>

            <div className='flex justify-center items-center mx-auto my-5'>
              <a href="https://twitter.com/RutikErole"><Twitter className='mr-10'/></a>
              <a href="https://www.instagram.com/rutik__erole/"><Instagram className='mr-10' /></a>
              <a href="https://www.linkedin.com/in/rutik-erole-842134205/"><LinkedIn className='mr-10' /></a>
              <a href="https://github.com/rutikerole"><GitHub /></a>
            </div>
          
            <div className=' p-4 text-xl font-bold text-white rounded-2xl drop-shadow-2xl m-10 mx-auto  mt-5 pb-35 w-96 h-100  bg-gradient-to-r from-fuchsia-600 to-violet-600'>
            <h1 className="text-4xl pt-2 my-1 text-center font-bold capitalize">{pokeman.id}. {pokeman.name}</h1>
            <div className="ml-16"><Image height={200} width={200} src={pokeman.image} alt={pokeman.name} /></div>
            <p><span className="m-2">Weight :</span> {pokeman.weight}</p>
            <p><span className="m-2">Height :</span> {pokeman.height}</p>
            <h2 className="text-2xl ml-2 mt-6 mb-2">Types :</h2>
            {pokeman.types.map((type, index) => (
                <p className='px-20' key="index">{type.type.name}</p>
            ))}
            <p className="mt-5 text-center"><Link href="/"><a className="text-2xl underline">Home</a></Link></p>
          </div>
          
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
        };
    } catch (err) {
        console.error(err);
    }
}
