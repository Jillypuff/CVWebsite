import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <img
              src="/images/profile.jpg"
              alt="Jesper Lindberg"
              className="img-fluid rounded-circle shadow"
              style={{ maxWidth: "250px" }}
            />
          </div>
          <div className="col-md-8">
            <h2>Hi, I'm Jesper!</h2>
            <p>
              I am 32 year old male and I live in Sweden, Uppsala. While I've
              always been intrested in programming and technologies I have just
              in recent year activly pursued a carrier in it.
            </p>
          </div>
        </div>
      </div>
      <Container className="py-5">
        <h2 className="mb-4 text-center">Hobbies</h2>
        <Row className="align-items-center mb-5">
          <Col md={4}>
            <img
              src="/images/coding.png"
              alt="Coding hobby"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={8}>
            <h4>Coding</h4>
            <p>
              I always try to learn a new skill or working on some small
              project. I often get lost in the sauce when I see something cool
              and I try to learn it for a week or two until I see something else
              cool and jump to that. I am an expert of having completed the
              first 25% of youtube courses. While this is not optional it's fun
              and I have a decent knowledge of many things. For some reason my
              goto project when learning a new language is an Elevator
              Simulator. It's a fun project both to test all the basics while
              having room for infinite expansion. I have done this in C#, Python
              and Java so far.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5 flex-md-row-reverse">
          <Col md={4}>
            <img
              src="/images/gaming.jpg"
              alt="Gaming hobby"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={8}>
            <h4>Gaming</h4>
            <p>
              I do spend alot of my free time playing video games. Some of my
              favorite game in recent memory is Elden Ring, Final Fantasy XIV
              and Factorio. Since I have alot of gamer friends I also tend to
              just play whatever popular game we're playing at the time. Some of
              my most played games include Counter-strike 2, Dota 2 and
              Warframe.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col md={4}>
            <img
              src="/images/sonluxlanterns.jpg"
              alt="Music hobby"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={8}>
            <h4>Music</h4>
            <p>
              Music is my biggest passion. When I was younger I played piano
              daily. I went to high school at IT-Gymnasiet in a special program
              called Music/IT/Multimedia. It's where I met alot of IT people and
              got my first introduction to coding. But it's also where I learned
              to play drums, guitar, bass, violin and evolved my piano skills.
              Nowadays I don't activly play any music myself but I still love
              listening to music and find new artist.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5 flex-md-row-reverse">
          <Col md={4}>
            <img
              src="/images/mewfrengers.jpg"
              alt="Music hobby"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={8}>
            <h4>Music again</h4>
            <p>
              I could probably add like 20 more of these cards just gushing
              about music I enjoy. I love finding new music and artist and I'm
              always evolving my taste. Thanks to Spotify and algorithms I have
              an avenue to explore all kinds of music. I can just match a song I
              know with a mood I feel like and use the "Go to song radio"
              feature to find new interesting artists. Then I can go to that
              artist and do a deep dive into their discography. This is how I
              have found many of many favorite artist of all time, but also how
              I created the problem discussing music with people since most
              people don't listen to obscure Japanese experimental orchestral
              bands.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col md={4}>
            <img
              src="/images/starsinourbedroomafterthewar.jpg"
              alt="Music hobby"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={8}>
            <h4>Music... again...</h4>
            <p>
              I could not possible list all the artists I love but I can add a
              few of my favorite artist in no particular order. | Beach House |
              Mew | World's End Girlfriend | Interpol | Ott | Uboa | Stars | Son
              Lux | clipping. | NEØV | mizuirono_inu | Kendrick Lamar | Metric |
              Sidewalks and Skeletons | Xinlisupreme | Carolina Polachek | Tame
              Impala | Sufjan Stevens | JPEGMAFIA | Blaue Blume | Carbon Based
              Lifeforms | KASHIWA DAISUKE | Elsiane | MONO | Let's Eat Grandma |
              Dua Lipa | 100 Gecs | Mother Mother | Weyes Blood | Tyler the
              Creator | Portishead | Earl Sweatshirt | AURORA | JID | alt-j |
              Charli xcx | The Avalanches | Daft Punkt | Lana Del Rey | Lusine |
              MF DOOM | Rival Consoles | You get one point for each artist you know!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
