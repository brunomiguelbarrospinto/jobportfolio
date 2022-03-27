<template>
  <div class="py-20 bg-white">
    <div class="container mx-auto max-w-screen-xl">
      <div class="grid grid-cols-2 gap-20">
        <div class="grid place-content-center">
          <h1 class="text-5xl font-extrabold leading-normal text-gray-800 mb-6">
            Hola, Soy <span class="text-red-400">Bruno Barros</span>.<br />
            Web Developer
          </h1>
          <h4 class="text-slate-500 font-extrabold mb-8">
            Actualmente especializándome en tecnologías relacionadas con el
            mundo Frontend como
            <a
              target="_blank"
              href="https://developer.mozilla.org/es/docs/Web/JavaScript"
              class="text-yellow-400 underline"
              >Javascript</a
            >,

            <a
              target="_blank"
              href="https://vuejs.org/"
              class="text-green-400 underline"
              >VueJS</a
            >,

            <a
              target="_blank"
              href="https://www.typescriptlang.org/"
              class="text-blue-500 underline"
              >TypeScript</a
            >,

            <a
              target="_blank"
              href="https://firebase.google.com"
              class="text-yellow-500 underline"
              >Firebase</a
            >.
          </h4>
          <div>
            <button
              class="bg-red-400 text-white px-5 py-3 rounded-full text-sm mr-6"
            >
              Contactame
            </button>
            <button class="text-slate-500">Acerca de mi</button>
          </div>
        </div>
        <div class="">
          <img
            src="https://picsum.photos/350/350"
            class="rounded-full mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>
