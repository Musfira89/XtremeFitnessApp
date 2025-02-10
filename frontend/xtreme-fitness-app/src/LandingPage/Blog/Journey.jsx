import React from "react";

const successStories = [
  {
    name: "Debanjan Mazumdar",
    rating: 5,
    beforeImg: "/before1.png",
    afterImg: "/after1.png",
    description:
      "I became a sculpted Indian Warrior! Dreams Triumph! Through my own way...",
  },
  {
    name: "Richard Pigford",
    rating: 5,
    beforeImg: "/before2.png",
    afterImg: "/after2.png",
    description:
      "Mis body's tight, shredded and lost weight and inches...",
  },
  {
    name: "Kenan Canton",
    rating: 5,
    beforeImg: "/before3.png",
    afterImg: "/after3.png",
    description:
      "I had an inspiring fat loss journey, my workouts and meal were on point...",
  },
  {
    name: "Joanette Stringer",
    rating: 5,
    beforeImg: "/before4.png",
    afterImg: "/after4.png",
    description:
      "With determination, I achieved an epic transformation...",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Success Stories</h2>
        <p className="text-gray-600 mt-2">See what our students have to say</p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {successStories.map((story, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <img src={story.beforeImg} alt="Before" className="rounded-md" />
                <p className="text-sm font-bold mt-2">Before</p>
              </div>
              <div className="text-center">
                <img src={story.afterImg} alt="After" className="rounded-md" />
                <p className="text-sm font-bold mt-2">After</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">{story.name}</h3>
                <p className="text-yellow-500">{"⭐".repeat(story.rating)}</p>
                <p className="text-gray-700 mt-2 text-sm">{story.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
