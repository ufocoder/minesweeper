import React, { useState } from 'react';

import { useWorldDispatch } from 'src/context/world';
import Modal from 'src/components/Modal';
import Help from 'src/components/Menu/Help';
import Settings from 'src/components/Menu/Settings';
import Window from 'src/components/Window';
import presets from 'src/context/lib/presets.json';

import './assets/styles.sass';

const Menu = () => {
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
    const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
    const { createWorld } = useWorldDispatch();

    return (
        <>
            <div className='menu'>
                <button className='menu__item' onClick={() => setShowSettingsModal(true)}>
                    Settings
                </button>
                <button className='menu__item' onClick={() => setShowHelpModal(true)}>
                    Help
                </button>
            </div>

            {showSettingsModal && (
                <Modal>
                    <Window title='Setting' style={{ padding: '10px' }} onClose={() => setShowSettingsModal(false)}>
                        <Settings
                            values={presets.easy}
                            onSubmit={(preset) => {
                                setShowSettingsModal(false);
                                createWorld(preset);
                            }}
                            onCancel={() => setShowSettingsModal(false)}
                        />
                    </Window>
                </Modal>
            )}

            {showHelpModal && (
                <Modal>
                    <Window title='About' style={{ padding: '10px' }} onClose={() => setShowHelpModal(false)}>
                        <Help />
                    </Window>
                </Modal>
            )}
        </>
    );
};

export default Menu;
