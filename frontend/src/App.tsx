function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-10 bg-white shadow-xl rounded-xl">
        <h1 className="text-5xl font-bold text-red-600 mb-4">
          ¡Bata Shoes! 👟
        </h1>
        <p className="text-lg text-gray-600">
          Si ves esto rojo y centrado, Tailwind funciona.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <h3>Zapatilla Bata</h3>
        </div>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Comprar Ahora
        </button>
      </div>
    </div>
  )
}

export default App