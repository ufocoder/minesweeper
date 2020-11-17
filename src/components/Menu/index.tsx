import React, { FC, useState } from 'react';

import Modal from 'src/components/Modal';
import Help from 'src/components/Menu/Help';
import Settings from 'src/components/Menu/Settings';
import Window from 'src/components/Window';

import presets from 'src/lib/presets.json';
import { Preset } from 'src/types';

import './assets/styles.sass';

interface MenuProps {
    onSettingsSubmit: (preset: Preset) => void;
}

const Menu: FC<MenuProps> = ({ onSettingsSubmit }) => {
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
    const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

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
                            onSubmit={(formValues) => {
                                setShowSettingsModal(false);
                                onSettingsSubmit(formValues);
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
