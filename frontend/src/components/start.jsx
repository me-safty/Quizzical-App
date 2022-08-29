export default function Start({setShow, show}) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Japanese Anime & Manga Questions</p>
      <button onClick={()=> setShow(!show)}>Start quiz</button>
    </div>
  )
}