--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(100) NOT NULL,
    size_in_km numeric(6,2),
    composition text,
    star_id integer
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(20),
    age_in_million_yrs integer,
    distance_in_light_yrs integer,
    has_black_hole boolean NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(20),
    age_in_million_yrs integer,
    description text,
    planet_id integer,
    has_life boolean NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(20),
    age_in_million_yrs integer,
    has_life boolean NOT NULL,
    star_id integer,
    kind_of_life_description text
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(40),
    age_in_million_yrs integer,
    distance_in_light_yrs integer,
    planet_types numeric,
    has_planets boolean NOT NULL,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'I''ll-Do-It-Tomorrow', 42.99, 'Pure procrastinite', 1);
INSERT INTO public.asteroid VALUES (2, 'Cosmic-Crumb', 0.99, 'Fossilized potato chips', 2);
INSERT INTO public.asteroid VALUES (3, 'Where-Are-My-Keys', 7.99, 'Mysterious metallic alloy', 3);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Andromeda', 10010, 2537000, false);
INSERT INTO public.galaxy VALUES (2, 'Whirlpool', 13270, 2316000, false);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 6280, 2723000, false);
INSERT INTO public.galaxy VALUES (4, 'Milky-Way-Too-Much', 8500, 42000000, false);
INSERT INTO public.galaxy VALUES (5, 'I''ll-Form-Later', 500, 7777777, false);
INSERT INTO public.galaxy VALUES (6, 'Where-Did-I-Put-That', 12345, 12345678, false);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Swiss-Cheese-Hole-1', 4, 'Just full of holes, no life', 1, false);
INSERT INTO public.moon VALUES (2, 'Moon-zarella', 6, 'Inhabited by stretchy cheese beings', 1, true);
INSERT INTO public.moon VALUES (3, 'Where-Did-I-Put-It', 78, 'Inhabitants costantly searching for things', 2, true);
INSERT INTO public.moon VALUES (4, 'Espresso-Shot', 34, 'Hyper-caffeinated tiny beings', 3, true);
INSERT INTO public.moon VALUES (5, 'Filter-Required', 10, 'All photos automatically get dog ears', 1, true);
INSERT INTO public.moon VALUES (6, 'Hashtag-4', 10, 'Barren rock shaped like a pound sign', 1, false);
INSERT INTO public.moon VALUES (7, 'Story-Expired', 10, 'Civilization that only lives for 24 hours', 1, true);
INSERT INTO public.moon VALUES (8, 'Keys-Phone-Wallet', 11, 'Pat-down ritual required for entry', 2, true);
INSERT INTO public.moon VALUES (9, 'Walking-Into-Room', 11, 'Vacant moon with confused atmosphere', 2, false);
INSERT INTO public.moon VALUES (10, 'Why-Am-I-Here', 23, 'Inhabitants always questioning existence', 2, true);
INSERT INTO public.moon VALUES (11, 'Left-Over-Pizza', 59, 'Cold but delicious ecosystem', 3, true);
INSERT INTO public.moon VALUES (12, 'Mystery-Tupperware', 45, 'Unknow contents, approach with caution', 3, false);
INSERT INTO public.moon VALUES (13, 'Condiment-Orbit', 23, 'Ketchup and mustard based lifeforms', 3, true);
INSERT INTO public.moon VALUES (14, 'Loading-Circle', 55, 'Spinning inhabitants', 9, true);
INSERT INTO public.moon VALUES (15, 'Connection-Lost', 3, 'Completely isolated rock', 10, false);
INSERT INTO public.moon VALUES (16, 'Please-Wait', 7, 'Very patient civilization', 11, true);
INSERT INTO public.moon VALUES (17, 'Coffee-Break', 4, 'Caffeinated surface, jittery inhabitants', 12, true);
INSERT INTO public.moon VALUES (18, 'Snooze-Button', 9, 'Hits orbital snooze every 9 minutes', 6, true);
INSERT INTO public.moon VALUES (19, 'Weekend-Is-Coming', 45, 'Distant hope of relaxation', 7, false);
INSERT INTO public.moon VALUES (20, 'Reset-Router', 33, 'Flashing light communication system', 8, true);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Cheesburgeria', 420, true, 1, 'Inhabited by sentient cheesburgers');
INSERT INTO public.planet VALUES (2, 'Fry_Too_Hot', 65, false, 1, 'Surface too hot, perpetual frying');
INSERT INTO public.planet VALUES (3, 'Shakes-a-Lot', 180, true, 1, 'Milky inhabitants who communicate through straw bubbles');
INSERT INTO public.planet VALUES (4, 'Socktopia', 730, true, 2, 'Civilization of single socks searching for their partners');
INSERT INTO public.planet VALUES (5, 'Remote-Control-ia', 25, false, 2, 'Planet constantly changes channel randomly');
INSERT INTO public.planet VALUES (6, 'Dust-Bunny-5', 15, true, 2, 'Fluffy inhabitants who multiply when you''re not looking');
INSERT INTO public.planet VALUES (7, 'Procrastinon', 999, true, 3, 'Aliens who''ve been "getting to it tomorrow" for centuries');
INSERT INTO public.planet VALUES (8, 'Coffe-IV-Drip', 88, true, 3, 'Beings with espresso veins, communicate in caffeine jitters');
INSERT INTO public.planet VALUES (9, 'Traffic-Jam-9', 350, true, 3, 'Civilization perpetually stuck in orbital gridlock');
INSERT INTO public.planet VALUES (10, 'Buffering-5', 33, true, 4, 'Civilization perpetually wainting for their shows to load at 99%');
INSERT INTO public.planet VALUES (11, 'Case-of-the-Mondays', 777, true, 5, 'Inhabitants move at 0.25 speed and communicate through sighs');
INSERT INTO public.planet VALUES (12, 'Password-Is-Guess', 66, true, 6, 'Entire civilization debates whether to reset the router');


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'M31-RV', 8200, 2537000, 0, false, 1);
INSERT INTO public.star VALUES (2, 'M51-ULS', 150, 23160000, 0, false, 2);
INSERT INTO public.star VALUES (3, 'M33-V1', 85000, 2723000, 0, false, 3);
INSERT INTO public.star VALUES (4, 'Sir-Shines-A-Lot', 250, 888, 3, true, 4);
INSERT INTO public.star VALUES (5, 'Stella-Drama-Queen', 750, 1234, 2, true, 5);
INSERT INTO public.star VALUES (6, 'Captain-Fashionably-Late', 50, 5555, 0, false, 6);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 3, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: asteroid asteroid_unique_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_unique_name UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: moon moon_unuque_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_unuque_name UNIQUE (name);


--
-- Name: galaxy name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT name UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_unique_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_unique_name UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_unique_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_unique_name UNIQUE (name);


--
-- Name: asteroid asteroid_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star fk_galaxy; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT fk_galaxy FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: moon fk_moon_planet; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT fk_moon_planet FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet fk_planet_star; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT fk_planet_star FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- PostgreSQL database dump complete
--

