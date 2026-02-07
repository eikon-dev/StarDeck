import {StarPlayer} from "@/shared/fx/players/StarPlayer";

import type {FXScenePort} from "@/processes/fx-runner/model/FXScene.port";
import type {FXPort} from "@/processes/fx-runner/model/fx.port";
import type {EffectItem} from "@/entities/fx/model/fx.type";
import type {FXPlayer} from "@/shared/fx/players/types";

export class FXRunner {
  private fxPort: FXPort;
  private scenePort: FXScenePort;

  //TODO: Сделать одну сущность для Id и Player
  private currentId: string | null = null;
  private currentPlayer: FXPlayer | null = null;

  constructor(fxPort: FXPort, scenePort: FXScenePort) {
    this.fxPort = fxPort;
    this.scenePort = scenePort;
  }

  tick(dt: number) {
    if (this.currentPlayer) {
      const done = this.currentPlayer.update(dt);

      if (done) {
        if (!this.currentId) return;
        this.fxPort.finish(this.currentId);

        this.currentPlayer = null;
        this.currentId = null;
      }

      return;
    }

    const effect: EffectItem | undefined = this.pickNext(this.fxPort.getQueue());
    if (!effect) return;

    const player = this.createPlayer(effect);
    if (!player) return;

    this.currentId = effect.id;
    this.fxPort.start(effect.id);
    this.currentPlayer = player;
  }

  private pickNext(queue: EffectItem[]): EffectItem | undefined {
    return queue.find(item => item.status === 'queued');
  }

  //TODO: Далее подумать о registry когда эффектов станет больше
  private createPlayer(effect: EffectItem): FXPlayer | null {
    switch (effect.type) {

      case 'star': {
        //TODO: Сделать player сам решает какие ему нужны ресурсы createPlayer не знает про mesh
        const mesh = this.scenePort.getStarMesh();
        const player = new StarPlayer(effect.payload);

        if (!mesh) return null;
        player.attach(mesh);

        return player;
      }
      default: {
        //TODO: Добавить _exhaustive: never = effect
        return null
      }
    }
  }
}