export async function borrowedKnowledge({
  speaker,
  actor,
  token,
  character,
  item,
  args,
  scope,
  workflow,
}) {
  function dialogRender(html) {
    let ths = html[0].getElementsByTagName('th');
    for (let t of ths) {
      t.style.width = 'auto';
      t.style.textAlign = 'left';
    }
    let tds = html[0].getElementsByTagName('td');
    for (let t of tds) {
      t.style.width = '50px';
      t.style.textAlign = 'center';
      t.style.paddingRight = '5px';
    }
  }
  let selection = await warpgate.menu(
    {
      inputs: [
        {
          label: 'Skill:',
          type: 'select',
          options: Object.entries(CONFIG.DND5E.skills)
            .filter(
              ([key, value]) => workflow.actor.system.skills[key].value < 1
            )
            .map(([i, j]) => ({ value: i, html: j.label })),
        },
      ],
      buttons: [
        {
          label: 'Cancel',
          value: false,
        },
        {
          label: 'OK',
          value: true,
        },
      ],
    },
    {
      title: workflow.item.name,
      render: dialogRender,
    }
  );
  if (!selection.buttons) return;
  async function effectMacro() {
    await warpgate.revert(token.document, 'Borrowed Knowledge');
  }
  const imgPropName = game.version < 12 ? 'icon' : 'img';
  let effectData = {
    label: workflow.item.name,
    [imgPropName]: workflow.item.img,
    origin: workflow.item.uuid,
    duration: {
      seconds: 3600,
    },
    changes: [
      {
        key: 'system.skills.' + selection.inputs[0] + '.value',
        mode: 4,
        value: '1',
        priority: 20,
      },
    ],
    flags: {
      effectmacro: {
        onDelete: {
          script: `(${effectMacro.toString()})()`,
        },
      },
    },
  };
  let updates = {};
  foundry.utils.setProperty(
    updates,
    'embedded.ActiveEffect.' + workflow.item.name,
    effectData
  );
  let effect = workflow.actor.effects.getName(workflow.item.name);
  if (effect) {
    if (warpgate.util.firstOwner(effect).id === game.user.id) {
      await effect.delete();
    } else {
      await socket.executeAsGM('removeEffect', effect.uuid);
    }
  }
  let options = {
    permanent: false,
    name: 'Borrowed Knowledge',
    description: 'Borrowed Knowledge',
  };
  await warpgate.mutate(workflow.token.document, updates, {}, options);
}
