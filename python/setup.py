# coding=utf-8
from setuptools import setup, find_packages
import io

with io.open("README.md", "r", encoding='utf8') as fh:
    long_description = fh.read()

setup(
    name='qcloud-python-sts',
    version='3.1.5',
    description='this is sts for python on v3',
    long_description=long_description,
    long_description_content_type="text/markdown",
    url='https://github.com/tencentyun/qcloud-cos-sts-sdk',
    author='qcloudterminal',
    author_email='qcloudterminal@gmail.com',
    license='MIT',
    packages=['sts'],
    install_requires=['requests']
)
