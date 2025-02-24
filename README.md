<img width="1246" alt="Screenshot 2025-02-24 at 7 39 04 AM" src="https://github.com/user-attachments/assets/05eb503f-9a8f-40d1-9546-1c7928fc49bc" /># Home Assignment for TypeScript Developers

This project is a home assesment for Espresso Labs.

Per the requirements, it is a web app that allows admins to view a list of network agents, create, update, and delete them. It uses Typescript, React, and Redux for state management and local storage.

I time-boxed this assignment to approximately 2 hours, and implemented the following additional features:

1. Search and Filter
2. Responsive Design
3. Unit Tests - These mainly focused on the local storage persistence, and form validation. I would like to add frontend testing to the project as well.

---

Per the description the app is runnable with the following commands:

```bash
npm install
npm start
```

I started with Vite since that's how I've started React apps in the past and I understand it's the preferred tool at Espresso. There is no default "start" command in the provided `package.json` so I added it.

As such, the project uses Vite's default settings, and should be visible at http://localhost:5173/

---

## Design Considerations

I tried to follow the Airbnb style guide for React/Jsx.
I built out React components for the project, including one for the form to add a new Agent, and one for the list of Agents, and one for the search bar since it was added later.
For the Typescript code, I created a model of the Agent in its own file, for use in the Typescript code. I implemented an ID (which is currently implemented as the timestamp upon creation) in addition to the fields specified. The last seen date is currently set at creation or update time, in place of a "real" agent.

I decided to use Redux for state management since I find it easier to use than other solutions in "vanilla" React.

I also implemented a bit of css to make the page look nice and somewhat responsive, but it could certainly use some optimizations before being production-ready on a mobile device :)

If there are any questions, I would be more than happy to respond to them and discuss the project further in an interview!

Video and photos should be in the media folder, but I will upload them here as well:
<img width="1246" alt="Screenshot 2025-02-24 at 7 39 04 AM" src="https://github.com/user-attachments/assets/4222dda2-b59d-4641-a903-eb77ad677e41" />
<img width="407" alt="Screenshot 2025-02-24 at 7 39 43 AM" src="https://github.com/user-attachments/assets/1d2b8448-f3fa-4f78-8660-d074d2268c23" />
<img width="1226" alt="Screenshot 2025-02-24 at 7 39 52 AM" src="https://github.com/user-attachments/assets/f12f86cf-601f-4e31-8b0e-cdc7dee5cd78" />
<img width="1251" alt="Screenshot 2025-02-24 at 7 40 06 AM" src="https://github.com/user-attachments/assets/8ae8669c-8ea6-4a51-85b9-e704d4b58861" />
<img width="274" alt="Screenshot 2025-02-24 at 7 40 18 AM" src="https://github.com/user-attachments/assets/655c7e6b-d0d5-452c-8608-cd0962776b52" />

https://github.com/user-attachments/assets/d00ada7e-6bf1-4041-9fa7-db4099622c15
