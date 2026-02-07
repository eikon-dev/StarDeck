# Version FSD v0.1

### Правила

- `shared` не импортирует `entities`
- `ports` живут в `processes/*/model`
- `adapters` живут в `processes/*/adapters/<tech>`
- `players` лежат в `shared/fx/players`
- `FXRequest` типы в `shared/fx/types`, очередь в `entities/fx`
- `index.ts` = `public API` папки


- `processes` — оркестрация во времени и реакция на потоки событий
- `features` — реакция на прямые действия пользователя