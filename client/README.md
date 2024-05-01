# TRELLO WITH NUXT

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

🍀 My project is a web application inspired by Trello

## Tech Stack

- [Nuxt](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Vue Use](https://vueuse.org/)
- [Vue Use Motion](https://motion.vueuse.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Draggable](https://sortablejs.github.io/vue.draggable.next/#/simple)
- [VueQuery](https://tanstack.com/query/)
- [Yarn](https://yarnpkg.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Start with Docker

Start project with docker compose ( zero config )

```bash
# run docker compose dev env
docker compose -f docker-compose.dev.yml up --build
```

## Setup Local

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## My config `.bashrc`

Follow [NVM GitHub README](https://github.com/nvm-sh/nvm/tree/master?tab=readme-ov-file#bash)

Automatically switch to correct version of Node based on project. Calling `nvm use` automatically in a directory with a `.nvmrc` file.

Put the following at the end of your `$HOME/.bashrc`:

**`The version of the nvm should be v1.1.11.`** - [**`ISSUE`**](https://github.com/coreybutler/nvm-windows/issues/1068)

```bash
nvm_find_up () {
    path=$(pwd)
    while [[ "$path" != "" && ! -e "$path/$1" ]]; do
        path=${path%/*}
    done
    echo "$path"
}

cdnvm() {
    current_version=$(nvm current)

    command cd "$@" || return $?
    nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version
        default_version="$(nvm version default)"

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [ $default_version = 'N/A' ]; then
            nvm alias default node
            default_version=$(nvm version default)
        fi

        # If the current version is not the default version, set it to use the default version
        if [ "$(nvm current)" != "${default_version}" ]; then
            nvm use default
        fi
    elif [[ -s "${nvm_path}/.nvmrc" && -r "${nvm_path}/.nvmrc" ]]; then
        declare nvm_version
        nvm_version=$(<"${nvm_path}"/.nvmrc)

        if [ "${current_version#v}" == "${nvm_version#v}" ]; then
            echo "Current ${current_version} Node.js version matches the version specified in .nvmrc."
            return
        fi

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "${nvm_version}" | command tail -1 | command tr -d '\->*' | command tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [ "${locally_resolved_nvm_version}" = 'N/A' ]; then
            nvm install "${nvm_version}";
        elif [ "$(nvm current)" != "${locally_resolved_nvm_version}" ]; then
            nvm use "${nvm_version}";
        fi
    fi
}

alias cd='cdnvm'
cdnvm "$PWD" || exit
```
