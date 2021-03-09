import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

// valueAsNumber = new Date().getTime()
function parseDate(date) {
  const re = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  if (date && date.match(re)?.[0]) {
    return date.match(re)?.[0];
  }

  return new Date().toISOString().match(re)[0];
}

function NewHotline() {
  const { url, path, ...rest } = useRouteMatch();
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      dateReceived: new Date().getTime(),
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="bg-white h-24 shadow">
        <div className="container mx-auto pt-2 px-1">
          <h2 className="font-semibold text-xl">Create New Hotline</h2>
        </div>
      </div>
      <div className="container mt-4 mx-auto px-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded shadow overflow-hidden hidden lg:block self-start sticky top-4">
          <nav className="p-6">
            <span className="font-medium text-lg">Sections</span>
            <ul className="mt-4">
              <li>
                <Link
                  to={`${path}`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Details
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/complainant`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Complainant
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/victims`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Victims
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/narrative`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Narrative
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/subjects`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Subjects
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/witnesses`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Witnesses
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/evidence`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Evidence
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={`${path}/actions`}
                  className="focus:outline-black hover:underline text-blue-700"
                >
                  Actions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-white rounded shadow overflow-hidden lg:col-span-3">
          <div className="p-6">
            <Switch>
              <Route exact path={path}>
                <fieldset id="details">
                  <legend className="font-semibold text-xl">Hotline Details</legend>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="origin" className="block font-medium">
                        Received via
                      </label>
                      <div className="relative">
                        <select
                          id="origin"
                          name="origin"
                          className="appearance-none border focus:border-blue-700 focus:outline-black h-10 inline-block px-2 rounded-sm w-full"
                        >
                          <option value="">-- Select a Value --</option>
                          <option value="C">C - Congressional</option>
                          <option value="F">F - Fugitive</option>
                          <option value="G">
                            G - Government Accountability Office
                          </option>
                          <option value="H">H - Telephone</option>
                          <option value="I">I - Web Forms</option>
                          <option value="L">L - Post Mail</option>
                          <option value="O">
                            O - OIG HQ Cross Component Collaborative Project
                          </option>
                          <option value="Q">Q - QUI-TAM</option>
                          <option value="S">S - Self-Disclosure</option>
                          <option value="Z">Z - Non-HHS Complaint</option>
                        </select>
                        <svg
                          viewBox="0 0 16 16"
                          className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="dateReceived" className="block font-medium">
                        Date received
                      </label>
                      {navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? (
                        <div className="grid grid-cols-5 gap-4">
                          <input
                            type="date"
                            id="dateReceived"
                            name="dateReceived"
                            className="border focus:border-blue-700 focus:outline-black inline-flex px-2 h-10 rounded-sm w-full bg-transparent items-center col-span-3"
                            ref={register}
                          />
                          <label htmlFor="timeReceived" className="sr-only">
                            Time received
                          </label>
                          <input
                            type="time"
                            name="timeReceived"
                            id="timeReceived"
                            className="border focus:border-blue-700 focus:outline-black inline-flex px-2 h-10 rounded-sm w-full bg-transparent items-center col-span-2"
                            ref={register}
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            id="dateReceived"
                            name="dateReceived"
                            type="datetime-local"
                            className="border focus:border-blue-700 focus:outline-black inline-flex px-2 h-10 rounded-sm w-full bg-transparent items-center"
                            ref={register}
                          />
                          <svg
                            viewBox="0 0 16 16"
                            className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="priority" className="block font-medium">
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          id="priority"
                          name="priority"
                          className="appearance-none border focus:border-blue-700 focus:outline-black h-10 inline-block px-2 rounded-sm w-full"
                        >
                          <option value="3">Low</option>
                          <option value="2">Medium</option>
                          <option value="1">High</option>
                        </select>
                        <svg
                          viewBox="0 0 16 16"
                          className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="organization" className="block font-medium">
                        Organization
                      </label>
                      <div className="relative">
                        <select
                          id="organization"
                          name="organization"
                          className="appearance-none border focus:border-blue-700 focus:outline-black h-10 inline-block px-2 rounded-sm w-full"
                          ref={register}
                        >
                          <option value="">-- Select a Value --</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <svg
                          viewBox="0 0 16 16"
                          className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={watch('organization') === 'OTHER' ? '' : 'hidden'}
                    >
                      <label
                        htmlFor="organizationOther"
                        className="block font-medium"
                      >
                        Other organization
                      </label>
                      <input
                        id="organizationOther"
                        name="organizationOther"
                        type="text"
                        className="appearance-none border focus:border-blue-700 focus:outline-black inline-block px-2 h-10 rounded-sm w-full"
                        ref={register}
                      />
                    </div>
                  </div>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="program" className="block font-medium">
                        Program
                      </label>
                      <div className="relative">
                        <select
                          id="program"
                          name="program"
                          className="appearance-none border focus:border-blue-700 focus:outline-black h-10 inline-block px-2 rounded-sm w-full"
                          ref={register}
                        >
                          <option value="">-- Select a Value --</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <svg
                          viewBox="0 0 16 16"
                          className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={watch('program') === 'OTHER' ? '' : 'hidden'}>
                      <label htmlFor="programOther" className="block font-medium">
                        Other program
                      </label>
                      <input
                        id="programOther"
                        name="programOther"
                        type="text"
                        className="appearance-none border focus:border-blue-700 focus:outline-black inline-block px-2 h-10 rounded-sm w-full"
                        ref={register}
                      />
                    </div>
                  </div>
                  <div className="gap-x-12 gap-y-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
                    <div>
                      <label htmlFor="project" className="block font-medium">
                        Project
                      </label>
                      <div className="relative">
                        <select
                          id="project"
                          name="project"
                          className="appearance-none border focus:border-blue-700 focus:outline-black h-10 inline-block px-2 rounded-sm w-full"
                          ref={register}
                        >
                          <option value="">-- Select a Value --</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <svg
                          viewBox="0 0 16 16"
                          className="absolute h-4 inline-block mr-3 mt-3 right-0 w-4"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={watch('project') === 'OTHER' ? '' : 'hidden'}>
                      <label htmlFor="projectOther" className="block font-medium">
                        Other project
                      </label>
                      <input
                        id="projectOther"
                        name="projectOther"
                        type="text"
                        className="appearance-none border focus:border-blue-700 focus:outline-black inline-block px-2 h-10 rounded-sm w-full"
                        ref={register}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="border border-transparent focus:border-blue-600 focus:outline-black font-medium hover:border-gray-100 hover:shadow p-2 rounded-sm text-blue-600 uppercase w-20"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="border border-blue-600 focus:outline-black font-medium lg:ml-auto p-2 rounded-sm text-blue-600 uppercase w-20"
                    onClick={() => alert(`date: ${watch('dateReceived')} time: ${watch('timeReceived')}`)}
                  >
                    Save
                  </button>
                  <Link
                    to={`${path}/complainant`}
                    className="bg-blue-600 border border-blue-600 focus:outline-black font-medium ml-2 p-2 rounded-sm text-white uppercase w-20 lg:w-auto text-center"
                    aria-label="Next: Complainant"
                  >
                    Next<span className="hidden lg:inline">: Complainant</span>
                  </Link>
                </div>
              </Route>
              <Route path={`${path}/complainant`}>Complainant</Route>
              <Route path={`${path}/victims`}>Victims</Route>
              <Route path={`${path}/narrative`}>Narrative</Route>
              <Route path={`${path}/subjects`}>Subjects</Route>
              <Route path={`${path}/witnesses`}>Witnesses</Route>
              <Route path={`${path}/evidence`}>Evidence</Route>
              <Route path={`${path}/actions`}>
                {(props) => <div>{JSON.stringify(props)}</div>}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewHotline;
