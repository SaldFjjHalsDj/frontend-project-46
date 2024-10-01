install:
				npm ci

lint:
				npx eslint .

update:
				npm update --save-dev

test:
				NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
				npm test -- --coverage --coverageProvider=v8

